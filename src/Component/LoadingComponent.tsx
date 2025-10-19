function LoadingComponent() {
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="flex p-5">
                <h1 className="font-medium text-2xl md:text-3xl">
                    Loading
                </h1>
                <div className="text-4xl overflow-hidden flex">
                    <div className="animate-bounce1">.</div>
                    <div className="animate-bounce1" style={{ animationDelay: '123ms' }}>.</div>
                    <div className="animate-bounce1">.</div>
                    <div className="animate-bounce1" style={{ animationDelay: '123ms' }}>.</div>
                </div>
            </div>
        </div>
    )
}

export default LoadingComponent