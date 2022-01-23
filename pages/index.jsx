import Layout from "../Components/Layout";
import Country from "../Components/Country";

const home = ({ data }) => {

  
  const handleSearch = (value) => {
    const allCountries = document.getElementsByClassName('country')
    const txt = value.toLowerCase()

    if(txt == null || txt.length == 0){
      for(let i = 0; i<allCountries.length; i++){
        allCountries[i].classList.remove('hidden')
      }

    } else {
      for(let i = 0; i< allCountries.length ; i++){
        if(allCountries[i].id.indexOf(txt)){
          allCountries[i].classList.add('hidden')
        } else {
          allCountries[i].classList.remove('hidden')
        }
      }
    }

  }


  const handleSelect = (value) => {

    const txt = value
    const countriesByContinent = document.getElementsByClassName('country')

    if(txt == 'country'){
      for(let i = 0; i< countriesByContinent.length; i++){
        countriesByContinent[i].classList.remove('continent-hide')
      }
    } else {
      for(let i = 0; i<countriesByContinent.length; i++){
        
        if(!countriesByContinent[i].classList.contains(txt)){
          countriesByContinent[i].classList.add('continent-hide')
        } else {
          countriesByContinent[i].classList.remove('continent-hide')
        }

      }
    }

  }


  return (
    <Layout title={"Countries API"}>

      <div className="my-12 flex flex-col md:flex-row w-full justify-between">
        <span className="bg-dark_blue text-custom_white py-2 rounded-md shadow-sm">
        <i className="fas fa-search mx-4 "></i>
        <input onChange={(e)=>{
          handleSearch(e.target.value)
          }} type="text" className="bg-transparent active:outline-none focus:outline-none  placeholder:text-custom_white" placeholder="Search for a country..." />
        </span>
        
        <select defaultValue="All" onChange={(e)=>{
          handleSelect(e.target.value)
        }} name="region" className="bg-dark_blue px-4 my-4 lg:my-0 py-2 rounded-md shadow-sm text-custom_white" id="region">
          <option disabled>Filter by region</option>
          <option value="country">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>

      </div>


      <div className="grid mt-12 gap-16 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto">
        {data.map((el, index) => (
          <Country key={index} continent={el.region} name={el.name.common} region={el.region}  capital={el.capital}  flag={el.flags.png} population={el.population} />
        ))}
      </div>
      
      <div className="w-full text-center py-4 my-4">
      <span className="font-semibold" >Coded by <a href="https://github.com/markorodriguez" target="_blank" rel="norreferer"  className="text-custom_white">Marko</a>. You can find the github repo <a target="_blank" rel="norreferer" href="https://github.com/markorodriguez/next-countries" className="text-custom_white">here.</a></span>
      </div>
       

    </Layout>
  );
};

export default home;

export async function getStaticProps() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();

    return {
      props: {
        data,
      },
    };
  } catch (err) {
    console.log(err);
  }
}

