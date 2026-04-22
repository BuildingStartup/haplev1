export default function AddProductButton({products, showForm, remaining, handleAddItem}){
    return (
        <>
        {products.length < 4 && !showForm && (
        <div className="flex flex-col gap-1.5">
          <p className="text-dark-100">
            You can add{" "}
            <span className="text-primary-light">
              {remaining}</span> more
            item{remaining !== 1 ? "s" : ""}
          </p>
          <button
            className="bg-primary text-white p-1.5 lg:p-2.5 text-sm rounded cursor-pointer"
            onClick={handleAddItem}            
          >
            Add Item ({products.length}/4)
          </button>
        </div>
      )}
        </>
    )
}