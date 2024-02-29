'use client';

import { useState } from 'react';

const CsvPreviewTable = ({ data }) => {
    const header = data && data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <>
            <h2>View - previewing CSV data</h2>
            <div className="flex justify-center content-center">
            <div className="h-[75vh] w-1/2 overflow-x-scroll">
                <table className="text-sm">
                    <thead>
                        <tr>
                            {header.map((item, key) => (
                                <th key={key}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((rec, idx) => {
                                return (
                                    <tr key={idx}>
                                        {
                                            Object.values(rec).map(
                                                (val, key) => <td key={key}>{val}</td>
                                            )
                                        }
                                    </tr>
                                );
                            }
                            )
                        ) : <tr><td>No CSV data available</td></tr>}
                    </tbody>
                </table>
            </div>
            </div>
        </>
    );
};

export default CsvPreviewTable;