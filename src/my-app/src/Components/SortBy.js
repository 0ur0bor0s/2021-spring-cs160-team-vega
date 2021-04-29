import React from 'react';
import Select from 'react-select';

const options = [
    { value: 'high', label: 'Price: high to low' },
    { value: 'low', label: 'Price: low to high' },
];

class SortBy extends React.Component {
    state = {
        selectedOption: null,
    };
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Sort by: `, selectedOption);
        if (selectedOption.value == 'high') {
            //To do: backend call to sort high to low
            //Need to use the same query call as the original search...
        }
        if (selectedOption.value == 'low') {
            //To do: backend call to sort low to high
        }
    };
    render() {
        const { selectedOption } = this.state;

        return (
            <Select
                value={selectedOption}
                onChange={(e) => this.handleChange(e)}
                options={options}
            />
        );
    }
}

export default SortBy

