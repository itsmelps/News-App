import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Loading from "./Loading";


export class News extends Component {

  constructor(props) {
    super(props);
    this.state = {
      article: [],
      page: 1,
      totalArticles: 0,
      loading : false,
      // category : this.props.category1
      country : this.props.country
    };
    console.log(this.state.country);
  }

    flag=0;

    async componentDidMount(){
    this.setState({loading: true});
    // console.log("A");
    // console.log(this.state.category);
    let URL= `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&country=${this.props.country}&apiKey=1d61e173548d4f49beee68569af9f7a4&page=1&pageSize=${this.props.pageItems}`;
    let unparsedData = await fetch(URL);
    let parsedData = await unparsedData.json();
    this.setState({article : parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading : false
    });
  }

  btnNextPage=async ()=>{
    if(Math.ceil((this.state.totalArticles)/this.props.pageItems)>=this.state.page+1){
      this.setState({loading: true});
      let URL= `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&country=${this.props.country}&apiKey=1d61e173548d4f49beee68569af9f7a4&page=${this.state.page+1}&pageSize=${this.props.pageItems}`;
      let unparsedData = await fetch(URL);
      let parsedData = await unparsedData.json();
      this.setState({
          article : parsedData.articles,
          page : this.state.page+1,
          loading : false
      });
    }
  }

  btnPrevPage=async ()=>{
    this.setState({loading: true});
    let URL= `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&country=${this.props.country}&apiKey=1d61e173548d4f49beee68569af9f7a4&page=${this.state.page-1}&pageSize=${this.props.pageItems}`;
    let unparsedData = await fetch(URL);
    let parsedData = await unparsedData.json();
    // console.log(parsedData.totalResults);
    this.setState({
        article : parsedData.articles,
        page : this.state.page-1,
        loading : false
    });
  }


  render() {
    return (
      <div className="container my-5">
        <h1 style={{textAlign: "center", fontSize:"50px", fontFamily: "'Georgia', serif" , marginTop: "4rem"}}>HEADLINES</h1>
        <hr/>
        <div className="row my-5">
          {!this.state.loading && this.state.article.map((element) => {
            return (
              <div className="col-md-4 my-5" key={element.url}>
                <NewsItems
                  title={element.title? element.title.slice(0,45) : ""}
                  description={element.description? element.title.slice(0,90) : ""}
                  imageURL={element.urlToImage? element.urlToImage: "news.jpg"}
                  newsURL={element.url}
                  author={element.author? element.author: "unknown"}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="next-prev d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" style={{height: "2.5rem", width: "7rem"}}  onClick={this.btnPrevPage}>&larr; Previous</button>
          {this.state.loading && <Loading/>}
          <button disabled={Math.ceil((this.state.totalArticles)/this.props.pageItems)<this.state.page+1} type="button" className="btn btn-dark" style={{height: "2.5rem", width: "7rem"}} onClick={this.btnNextPage}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
