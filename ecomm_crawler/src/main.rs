use std::{io::Read, str::FromStr, env, fs::OpenOptions, io::prelude::*};
use select::document::Document;
use select::predicate::{Name, And, Class};
use select::node;
use std::fmt;
use reqwest::Url;
use serde::{Serialize, Deserialize};
use mongodb::{Client, options::ClientOptions, bson::doc};

/// Data structure to hold item details
#[derive(Serialize, Deserialize, Debug)]
struct ItemContent {
    buy_link: String,
    name: String,
    price: f32,
    img_link: String
}

impl fmt::Display for ItemContent {
    // This trait requires `fmt` with this exact signature.
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        // Write strictly the first element into the supplied output
        // stream: `f`. Returns `fmt::Result` which indicates whether the
        // operation succeeded or failed. Note that `write!` uses syntax which
        // is very similar to `println!`.
        return write!(f, "{}", self.name);
    }
}

/// Parse url and make sure that it is of valid format
fn normalize_url(url: &str) -> Option<&str> {
    let new_url = Url::parse(url);
    match new_url {
        Ok(_new_url) => Some(url),
        Err(_e) => None,
    }
}

/// Turn select::node::Node into an ItemContent object
fn conv_to_item_content(node: node::Node) -> Option<ItemContent> {

    //  println!("Node context: {}\n", node.html());

    let buy_link = node
        .find(And(Name("a"), Class("s-item__link")))
        .filter_map(|n| n.attr("href"))
        .filter_map(normalize_url)
        .next();
    
    //   println!("{}\n", buy_link.unwrap());

    let name = node
        .find(And(Name("h3"), Class("s-item__title")))
        .next()
        .unwrap()
        .children()
        .flat_map(|n| n.as_text())
        .next();

    //  println!("{}\n", name.unwrap());

    let price_str = node
        .find(And(Name("span"), Class("s-item__price")))
        .next()
        .unwrap()
        .children()
        .flat_map(|n| n.as_text())
        .next();

    //  println!("{}\n", price_str.unwrap());

    let img_link = node
        .find(Name("img"))
        .filter_map(|n| n.attr("src"))
        .filter_map(normalize_url)
        .next();

    //  println!("{}\n", img_link.unwrap());

    if buy_link.is_some() && name.is_some() && price_str.is_some() && img_link.is_some() {
        // Convert price from string to price
        let price = FromStr::from_str(price_str.unwrap()
            .split("$")
            .collect::<Vec<&str>>()[1]);

        match price {
            Ok(price) => { 
                Some(ItemContent {
                    buy_link: buy_link.unwrap().to_string(),
                    name: name.unwrap().to_string(),
                    price: price,
                    img_link: img_link.unwrap().to_string()
                }) 
            },
            Err(e) => {
                println!("ERROR: {}", e);
                None
            } 
        }
    } else {
        None
    }
    
    
}

/// From html body extract relavant content and store into object vector
fn extract_content(html: &str) -> Vec<ItemContent> {

    // Get document object for only the html content of the search results on the page
    let items = Document::from(&*Document::from(html)
                                            .find(Class("srp-results"))
                                            .next()
                                            .unwrap()
                                            .inner_html());

    // Return vector object of ItemContent objs representing extracted data
    items
        .find(And(Name("li"), Class("s-item")))
        .filter_map(conv_to_item_content)
        .collect::<Vec<ItemContent>>()
}

/// Convert objects to one json string
#[allow(dead_code)]
fn structs_to_json(contents: &Vec<ItemContent>) -> String {
    let mut json_payload: String = "[".to_owned();

    // Add each obj to the json string
    for item in contents {
        let json_obj = &*serde_json::to_string(&item).unwrap();
        json_payload.push_str(json_obj);
        json_payload.push_str(",");
    }
    json_payload.pop();
    json_payload.push_str("]");

    json_payload
}


#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    let args: Vec<String> = env::args().collect();

    // Return if there are not 2 arguments 
    assert_eq!(args.len(), 3);

    // Create url
    let search_item = &args[1];
    let page_nums: u32 = *&args[2].parse::<u32>().unwrap() - 1;
    
    // Create client to send server requests
    let client = reqwest::blocking::Client::new();

    // Vector to store data objs
    let mut item_vec: Vec<ItemContent> = Vec::new();

    // Iterate through each page
    for n in 0..=page_nums {
        // Request html content
        let page_url = &*format!("{}{}{}{}", "https://www.ebay.com/sch/i.html?_from=R40&_nkw=", search_item, "&_sacat=0&_pgn=", n);
        let mut res = client.get(page_url).send().unwrap();
        println!("Status for {}: {}", page_url, res.status());

        // Store html and convert from u8 to str primitive
        let mut body: Vec<u8> = Vec::new();
        res.read_to_end(&mut body).expect("Unable to read html content");
        let body_str = String::from_utf8_lossy(&body);

        // Extract the contents 
        let mut page_items: Vec<ItemContent> = extract_content(&body_str);
        item_vec.append(&mut page_items);
        
    }

    // Convert to json and write to file    
    //let payload: String = structs_to_json(&item_vec);

    //Establish connection to db and write documents to ebay-items
    // let client = Client::with_uri_str("mongodb+srv://ScraperUser:F70vBi0jVsFPF5je@cluster0.sdafj.mongodb.net/items?retryWrites=true&w=majority").await.unwrap();
    let client = Client::with_uri_str("mongodb+srv://jalend:Jdindin98!@vega.gbbi0.mongodb.net/vega?").await.unwrap();
    let database = client.database("items");
    let collection = database.collection("ebay-items");

    let mut docs = vec![];

    for item in item_vec {
        docs.push(doc! {
            "buy_link": item.buy_link,
            "name": item.name,
            "price": item.price,
            "img_link": item.img_link
        });
    }

    let insert_result = collection.insert_many(docs, None).await;

    println!("{:#?}", insert_result);


    // Write to file
    /*let mut file = OpenOptions::new()
        .write(true)
        .create(true)
        .truncate(true)
        .open("results.json")?;
    file.write_all(payload.as_bytes())?;*/

    Ok(())
}
