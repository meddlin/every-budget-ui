import { useState } from 'react';
import { usePapaParse } from 'react-papaparse';

/**
 * FileUpload component/page
 * 
 * This component serves (rudimentarily) to read a CSV file and display its
 * contents within the browser.
 * 
 * Getting the Form Together
 * Ref: https://www.pluralsight.com/guides/uploading-files-with-reactjs
 * This article helped piece together the major parts of the functionality:
 * - basic HTML structure
 * - initial state
 * Notes: it looks like 'isFilePicked' was mislabeled, and should be 'isSelected'
 * Also, I had to remove 'lastModifiedDate' from being read out in JSX. It
 * produces some type/undefined errors, and I didn't need it anyway. I stopped
 * just before using the code to actually upload the file with Fetch API.
 * 
 * Reading the File
 * Ref: https://dev.to/theallegrarr/read-csv-files-in-react-apps-without-installing-any-package-hn7
 * Ref, FileReader API: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 * Then this article demonstrated how to use the FileReader to read the contents
 * of the CSV file. Once data is being read, create another piece of state,
 * and display it.
 * 
 * Parsing CSV Content
 * Ref: https://react-papaparse.js.org/docs#csv-to-json
 * Using the PapaParse CSV parser to convert our delimited text into arrays.
 * Ref: https://github.com/Bunlong/react-papaparse/blob/v4.0.0/examples/readString.tsx
 * This source code example from the PapaParse repo, shows how to use the
 * 'readString()' function. Turns out 'usePapaParse()' is a custom hook.
 * 
 * Some array utilities were also helpful getting all of this working togther:
 * - Array slice: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
 * - Array.map index as key, for unavailable IDs: https://reactjs.org/docs/lists-and-keys.html
 */

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);
    // const [dataContents, setDataContents] = useState();
    const [parsedContents, setParsedContents] = useState();
    const { readString } = usePapaParse();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const handleSubmission = () => {
        console.log('file submitted');

        const file = selectedFile;
        const reader = new FileReader();

        reader.onload = function(e) {
            const text= e.target.result;
            const parsed = readString(text);
            setParsedContents(parsed);
            // setDataContents(text);
        }

        reader.readAsText(file);
    };

    return (
        <div>
            <input type="file" name="file" onChange={changeHandler} />
            {isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>

            <table>
                {parsedContents ? (<thead>
                    <tr>
                        {parsedContents.data[0].map(item => (<th>{item}</th>))}
                    </tr>
                </thead>) : ''}
                <tbody>
                    {parsedContents ? parsedContents.data.slice(1).map((row, index) => (
                        <tr key={index}>
                            {row.map((item, index) => (<td key={index}>{item}</td>))}
                        </tr>
                    )) : ''}
                </tbody>
            </table>
        </div>
    );
}

export default FileUpload;