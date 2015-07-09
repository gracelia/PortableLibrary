var NewBook = React.createClass({
	render: function(){
		return(
			<div class="book-model add-book" ></div>
		)
	}
});
var Book = React.createClass({
	render: function(){
		var bookName = this.props.book.bookName;
		var bookIntro = this.props.book.bookIntro;
		var bookImgAddress = this.props.book.bookImgAddress;
		return (
			<div class="book-model">
				<img src={bookImgAddress} />
				<div class="book-info">
					<h1>{bookName}</h1>
					<p>{bookIntro}</p>
				</div>
			</div>
		)
	}
});
var BooksExhibitContainer = React.createClass({
	getInitialState: function(){
	    return {
	    	books: []
	    }
  	},
	componentDidMount: function(){
		$.ajax({
      		url: this.props.url,
	    	dataType: 'json',
	    	type: 'get',
	    	success: function(response){
	    	  this.setState({
	    	  	books: response.books
	    	  });
	    	}.bind(this),
	    	error: function(xhr, status, err){
	    	  console.log(this.props.url, status, err.toString());
	    	}.bind(this)
	    });
	},
	render: function(){
		var bookCollector = [];
		this.state.books.forEach(function(book){
			bookCollector.push(<Book book={book}/>);
		});
		return(
			<div class="books-container">{bookCollector}</div>
		)
	}
});
React.render(<BooksExhibitContainer url="booksInfo.json"/>, document.body);
