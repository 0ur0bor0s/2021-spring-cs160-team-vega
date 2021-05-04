use std::{io::Read, str::FromStr, env, fs::OpenOptions, io::prelude::*};
use select::document::Document;
use select::predicate::{Name, And, Class, Attr};
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
        Err(_e) => None
    }
}

/// Turn select::node::Node into an ItemContent object
fn conv_to_item_content_ebay(node: node::Node) -> Option<ItemContent> {

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


fn conv_to_item_content_amazon(node: node::Node) -> Option<ItemContent> {
    let mut inner_node_option = node
        .find(Class("sg-col-inner")).next();
        
    if inner_node_option.is_none() {
        return None
    }
        
    inner_node_option = inner_node_option.unwrap()
        .find(Class("slot=MAIN")).next();

    if inner_node_option.is_none() {
        return None
    }

    inner_node_option = inner_node_option.unwrap()
        .find(Class("a-section")).next();


    
    // Filter out html content that does not pertain to the search items
    let inner_node;
    if inner_node_option.is_none() {
        return None
    } else {
        inner_node = inner_node_option.unwrap();
    }

    let img_link = inner_node
        .find(Class("s-image-overlay-black")).next().unwrap()
        .find(Class("s-image-overlay-white-semitransparent")).next().unwrap()
        .find(Class("rush-component")).next().unwrap()
        .find(Class("a-link-normal")).next().unwrap()
        .find(Class("s-image"))
        .filter_map(|n| n.attr("src"))
        .filter_map(normalize_url)
        .next();

    //println!("{}\n", img_link.unwrap());
    
    let name = inner_node
        .find(Class("a-spacing-top-small")).next().unwrap()
        .find(Name("h2")).next().unwrap()
        .find(Name("a")).next().unwrap()
        .find(Name("span")).next().unwrap()
        .children()
        .flat_map(|n| n.as_text())
        .next();

    //println!("{}\n", name.unwrap());

    let buy_link_end = inner_node
        .find(Class("a-spacing-top-small")).next().unwrap()
        .find(Name("h2")).next().unwrap()
        .find(Class("a-link-normal"))
        .filter_map(|n| n.attr("href"))
        .next();

    let mut buy_link = "https://www.amazon.com".to_owned();
    if buy_link_end.is_some() {
        buy_link.push_str(&buy_link_end.unwrap());
    } else {
        return None
    }

    //println!("{}\n", buy_link);

    
    let mut price_nodes = inner_node
        .find(Class("a-spacing-top-small")).skip(1).next().unwrap()
        .find(Class("a-row")).next();

    if price_nodes.is_none() { return None }

    price_nodes = price_nodes.unwrap()
        .find(Class("a-link-normal")).next();

    if price_nodes.is_none() { return None }

    price_nodes = price_nodes.unwrap()
        //.find(Attr("data-a-size", "l")).next().unwrap();
        //.find(And(Class("a-link-normal"), Attr("data-a-size", "l"))).next().unwrap()
        .find(Class("a-price")).next();

    if price_nodes.is_none() { return None }

    let price_str = price_nodes.unwrap()
        .find(Class("a-offscreen"))
        .next().unwrap()
        .children()
        .flat_map(|n| n.as_text())
        .next();

    //println!("{}\n", price_str.unwrap());

    if name.is_some() && price_str.is_some() && img_link.is_some() {
        // Convert price from string to price
        let price = FromStr::from_str(price_str.unwrap()
            .split("$")
            .collect::<Vec<&str>>()[1]);
        

        match price {
            Ok(price) => { 
                Some(ItemContent {
                    buy_link: buy_link.to_string(),
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
fn extract_content(html: &str, webpage: &str) -> Vec<ItemContent> {

    match webpage {
        "Ebay" => {
            // Get document object for only the html content of the search results on the page
            let items = Document::from(&*Document::from(html)
                .find(Class("srp-results"))
                .next()
                .unwrap()
                .inner_html());

            // Return vector object of ItemContent objs representing extracted data
            items
                .find(And(Name("li"), Class("s-item")))
                .filter_map(conv_to_item_content_ebay)
                .collect::<Vec<ItemContent>>()
        },
        "Amazon" => {
            let items = Document::from(&*Document::from(html)
                .find(Class("s-main-slot"))
                .next().unwrap()
                .inner_html());
            
            
            //println!("{}", items.find(Class("s-result-item")).next().unwrap().html());
            items
                .find(And(Class("s-result-item"), Class("sg-col-4-of-12")))
                //.enumerate()
                //.filter_map(|(i, n)| if i != 0 { Some(n) } else { None })
                .filter_map(conv_to_item_content_amazon)
                .collect::<Vec<ItemContent>>()


            //Vec::new()
        }
        _ => {
            println!("Not valid website");
            Vec::new()   
        }
    }
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
    let mut search_item_chars = (&*args[1]).chars();
    //search_item_chars.next();
    search_item_chars.next_back();
    let search_item = search_item_chars.as_str();
    let page_nums: u32 = *&args[2].parse::<u32>().unwrap() - 1;
    
    // Create client to send server requests
    let client = reqwest::blocking::Client::builder().gzip(true).build().unwrap();

    // Vector to store data objs
    let mut item_vec: Vec<ItemContent> = Vec::new();

    // Iterate through each page

    // Ebay
    for n in 0..=page_nums {
        // Request html content
        let page_url = &*format!("{}{}{}{}", "https://www.ebay.com/sch/i.html?_from=R40&_nkw=", search_item, "&_sacat=0&_pgn=", n);
        let mut res = client.get(page_url).send().unwrap();
        println!("Status for {}: {}", page_url, res.status());

        // Store html and convert from u8 to str primitive
        let mut body: Vec<u8> = Vec::new();
        res.read_to_end(&mut body).expect("EBAY.COM: Unable to read html content");
        let body_str = String::from_utf8_lossy(&body);

        // Extract the contents 
        let mut page_items: Vec<ItemContent> = extract_content(&body_str, "Ebay");
        item_vec.append(&mut page_items);
        
    }

    // Amazon
    for n in 0..=page_nums {
        // Request html content
        let page_url = &*format!("{}{}{}{}{}", "https://www.amazon.com/s?k=", search_item, "&page=", n, "&ref=nb_sb_noss_2");
        let mut res = client.get(page_url).send().unwrap();
        println!("Status for {}: {}", page_url, res.status());

        // Store html and convert from u8 to str primitive
        let mut body: Vec<u8> = Vec::new();
        res.read_to_end(&mut body).expect("AMAZON.COM: Unable to read html content");
        let body_str = String::from_utf8_lossy(&body);

        //println!("{}", body_str);

        // Extract the contents 
        let mut page_items: Vec<ItemContent> = extract_content(&body_str, "Amazon");
        item_vec.append(&mut page_items);
    }

    // Convert to json and write to file    
    //let payload: String = structs_to_json(&item_vec);

    //Establish connection to db and write documents to ebay-items
    let client = Client::with_uri_str("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false").await.unwrap();
    let database = client.database("Products");
    let collection = database.collection("product");

    let mut docs = vec![];

    for item in item_vec {
        
        docs.push(doc! {
            "buy_link": item.buy_link,
            "product_title": item.name,
            "product_price": item.price,
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
    file.write_all(payload.as_bytes())?;
    */

    Ok(())
}
