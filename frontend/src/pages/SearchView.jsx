import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
const ProductList = styled.div`
    padding: 10px;
    display: grid;
    grid-template-columns:repeat(auto-fill, 300px);
    justify-content: center;
    column-gap: 40px;
    row-gap: 20px;
    margin-top: 50px;
`
const Container = styled.div`
    margin-top: 50px;
    display:flex;
    flex-direction: column;
`
const FilterContainer = styled.div` 
    display: flex;
    justify-content: space-between;
    padding: 5px 50px;
    font-size: 2rem;
`
const FilterDiv = styled.div` 
    display: flex;
`
const SortDiv = styled.div` 
    display: flex;
`
const Select = styled.select` 
    margin-left: 1rem;
    width: 100px;
`
const StyledLink = styled(Link)`
    text-decoration: none;
    color : black;
`
const SearchView = () => {
    const [products,setProducts] = useState([]);
    const [searchParams,setSearchParams] = useSearchParams();
    const title = searchParams.get('title');
    useEffect(() => {
        fetch(`http://localhost:5000/api/product?title=${title}`)
        .then(res => res.json()) 
        .then(res => setProducts([...res]))
        .catch(err => console.log(err));
    })
  return (
    <Container>
        <FilterContainer>
            <FilterDiv>
            <p>Filter Products: </p>
            <Select name="size" id="size">
            <option value="small">S</option>
            <option value="medium">M</option>
            <option value="large">Mercedes</option>
            <option value="xlarge">Audi</option>
            </Select>
            <Select name="color" id="color">
            <option value="red">Red</option>
            <option value="black">Black</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            </Select>
            </FilterDiv>
            <SortDiv>
            <p>Sort Products: </p>
            <Select name="sort" id="sort">
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
            <option value="popularity">Popularity</option>
            </Select>
            </SortDiv>
        </FilterContainer>
        <ProductList>
            {products.map((product,index) => {
                return <StyledLink to={`/${product._id}`} key={index}><Product product={{...product}} /></StyledLink>
            })}
        </ProductList>
    </Container>
  )
}

export default SearchView