function Users({id, name, img, handle}) {
    return (
        <div className="flex my-4">
            <img src={img} alt={name} className="h-10 w-10 sm:h-12 sm:w-12 rounded-full"/>
            <div className=" pl-4 flex items-center justify-between w-full">
                <div className="text-sm sm:text-base">
                <p className="font-semibold">{name}</p>
                <p>{handle}</p>
                </div>
                <button className="bg-gray-400 font-semibold text-gray-50 rounded-md py-1 px-2">Follow</button>

            </div>
        </div>
    )
}

export default Users
