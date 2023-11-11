

type categories = {
  categories: {
    name: string;
    subcategories: string[];
  }[]
};

const getCategories = async (): Promise<categories> => {
  let res = await fetch("http://localhost:3000/api/categories");
  let categoryJson = await res.json();

  return categoryJson;
}

export default async function Home() {
  let categoryJson = await getCategories();
  console.log(">>>>>", categoryJson)
  return (
    <>
      <header>
      </header>
      <main>
        <input type='text' className='search-bar' />
        <select className="category-select" placeholder="Select Category">
          {categoryJson.categories.map((category, index) => {
            return <>
              <optgroup className="category-opt-group" key={`${category.name}_${index}`} label={category.name}>
                {category.subcategories.map((subCategory, i) => {
                  return <>
                    <option key={`${subCategory}_${i}`} className="category-option" value={subCategory}>{subCategory}</option>
                  </>
                })}
              </optgroup  >
            </>
          })}
        </select >
      </main>

      <footer>

      </footer>
    </>

  )
}
