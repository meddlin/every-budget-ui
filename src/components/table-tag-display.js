export default function TableTagDisplay({ tags }) {
    return (
        <ul>
            {tags.map((tag, key) => 
                <li 
                    key={key}
                    className={`rounded-sm px-3 py-2 text-sm hover:bg-slate-100 hover:cursor-pointer`}
                >
                    {tag}
                </li> 
            )}
        </ul>
    );
}