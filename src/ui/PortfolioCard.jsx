function PortfolioCard({index, item}) {
    return (
        <div key={index} className="bg-accent-light rounded-xl  p-2 lg:p-3 flex flex-col gap-2 lg:gap-3.5">
            <picture>
                <img src={`../${item?.image_url}.jpg`} alt={item.name} />
            </picture>
            <div className="space-y-4 lg:space-y-7.5 mb-3">
                <p className="lg:text-sm font-medium">{item?.name}</p>
                <p className="text-neutral-500">{item?.description}</p>
            </div>
        </div>
    )
}

export default PortfolioCard
