function LoadingComponent() {
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="flex justify-center items-center flex-col gap-7">
                <div className="flex justify-center items-center flex-col gap-2">
                    <img src="/logo-grey.png" className="w-[70px]  object-contain" />
                    <p className="font-medium">Chat App</p>
                </div>
                <div>
                    <div className="w-[200px] sm:w-[240px] overflow-hidden h-[6px] rounded-full bg-zinc-200">
                        <div className="loading3 bg-blue-700 h-full"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingComponent