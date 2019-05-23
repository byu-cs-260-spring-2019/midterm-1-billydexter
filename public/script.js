let app = new Vue({
	el: '#app',
	data:
	{

		bookTitle: '',
		allBooks: [
			{
				title: '',
				author_name: '',
				first_publish_year: '',
				favorite: false,
				starImage: '',
				thumbnail_url: ''
			}
		],
		loading: false,
	},
	methods:
	{
		async getBookTitle()
		{
			this.loading = true;
			try
			{
				const response = await axios.get("http://openlibrary.org/search.json?q=" + this.bookTitle);
				console.log("response: ", response);
				this.loading = false;
				this.allBooks = response.data.docs;
				for (var i = 0; i < this.allBooks.length; i++)
				{
					this.allBooks[i].starImage = "./DeselectedStar.png";
				}
				//var isbn = response.data.docs[1].isbn[0];
				/*const imageResponse = await axios.get("https://openlibrary.org/api/books?bibkeys=ISBN:" + isbn + "&jscmd=details&format=json")
				console.log("imageResponse:", imageResponse);
				var imageISBN = "ISBN:" + isbn;
				this.thumbnail_url = imageResponse.data;
				console.log(thumbnail_url);*/
			}
			catch(error)
			{
				console.log(error);
				this.loading = false;
			}
		},
		starMouseClick(item)
		{
			var index = this.allBooks.indexOf(item);
			console.log(index);
			this.allBooks[index].starImage='./SelectedStar.png';
			console.log(this.allBooks[index].starImage);
			this.favorite = true;
		}
	},
})