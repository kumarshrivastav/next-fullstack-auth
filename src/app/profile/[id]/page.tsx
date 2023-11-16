export default function UserProfile({params}:any){
return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Hello {params.id}</h1>
        <h4>This is your profile page</h4>
    </div>
)
}