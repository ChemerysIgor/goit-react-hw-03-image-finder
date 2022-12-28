import {Searchbar} from './Searchbar/Searchbar'
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Component } from 'react';

import { GlobalStyles } from './GlobalStyles';
import { LoadMore } from './Button/Button';
import { Grid } from 'react-loader-spinner';

const BASE_URL = "https://pixabay.com/api/";
const KEY = "30718387-37dd0a29c3a586dd3ee616e94"

export  class App extends Component {
  state = {
    page: 1,
    searchValue: "",
    images: null,
    
    error: null,
    status : ""
  };

   componentDidUpdate(prevProps, prevState) {
    const nextValue = this.state.searchValue;
    const prevValue = prevState.searchValue;
    console.log(nextValue);
    console.log(prevValue)
    const { searchValue, page } = this.state;
   
    if (nextValue !== prevValue || prevState.page !== this.state.page) {
      this.setState({ status: "pending" })
      fetch(`${BASE_URL}?q=${searchValue}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => {
          if (response.ok) { return response.json() }
          return Promise.reject(new Error(`Відсутні картинки за відповідають критеріям пошуку`))
        })
        .then(response => {
          if (response.hits.length === 0) {
            return (this.setState({ error: "There are no images matching your request! Try another keyring", status: "rejected" }))
          }
          else {
            if (response.hits.length === response.hits.total || response.hits.length < 12) {
              this.setState({ status: "idle" })
            } else { this.setState({ status: "resolved" }) }
          }
                      
          this.addImages({
            images: response.hits.map(hit => {
              return { id: hit.id, tags: hit.tags, largeImage: hit.largeImageURL, smallImage: hit.webformatURL }
            })
          })
        }
        ).catch(error => { this.setState({ error: error.message, status: "rejected" }) })
    }
  }
    addImages = ({ images }) => {
    
    if (!this.state.images) { 
      this.setState({
        images: images})
    } else {
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...images],
     }})}}

  handleLoading = () => {
     this.setState(prevState => ({ page: prevState.page + 1 })
    ) };

    handleFormValue = (value) => {
      this.setState({
status : "",
         page: 1,
    searchValue: value,
    images: null,
          })
    };
    
    render() {
    const { images,  status} = this.state;
 
    return (
      <>
        <GlobalStyles />
       <Searchbar onForm={this.handleFormValue} status={status} />
        
       {status === "pending" && <Grid
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />}
        {status === "rejected" && <div> {this.state.error}</div>}
      
        {!images && <div> {this.state.error}</div>}
        {status === "loading" && <Grid
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        }
        {images && <ImageGallery images={images} />}
         {status === "resolved" && <LoadMore MoreLoading={this.handleLoading} />}
        </>
    )    
  }

}
      
      
   
  

 

