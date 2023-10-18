import React from 'react'
import makeAnimated from 'react-select/animated';
import AsyncCreatableSelect from 'react-select/async-creatable';
import axios from 'axios';

const animatedComponents = makeAnimated();

  const promiseOptions = (inputValue:string) => {
    // Use the fetch API to make an HTTP request to your endpoint
    return fetch(`/api/tags/${inputValue}`)
      .then((response) => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
        // Ensure the data from the server is in the expected format
        if (Array.isArray(data)) {
          // Map the data to the format required by the component
          return data.map((tag) => ({ value: tag.id, label: tag.name }));
        }
        return [];
      })
      .catch((error) => {
        console.error('Error fetching tags:', error);
        return [];
      });
  };
const TagSelect = () => {
  return (
    <div className='mt-4 flex flex-col gap-2 w-full px-8'>
        <label>Tags</label>
        <AsyncCreatableSelect
            components={animatedComponents}
            isMulti
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
        />
    </div>
  )
}

export default TagSelect