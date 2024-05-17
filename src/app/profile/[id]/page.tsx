
export default function page({params}:any){
    return (
        <div>
            <h1>Profile page</h1>
            <h2>{params.id}</h2>
        </div>
    )
}