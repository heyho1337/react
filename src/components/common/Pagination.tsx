"use client";

class Pagination {

	constructor(fetchDataCallback, data) {
		this.fetchDataCallback = fetchDataCallback;
		this.data = data;
	}

	renderPagination(data) {
		const totalPages = Math.ceil(data.players.length / this.data.pageSize);
		return (
		  <div>
			<span>Page: {data.currentPage} of {totalPages}</span>
			<button onClick={() => this.changePage(-1)} disabled={data.currentPage === 1}>Previous</button>
			<button onClick={() => this.changePage(1)} disabled={data.currentPage === totalPages}>Next</button>
		  </div>
		);
	}
	
	async changePage(delta) {
		this.data.currentPage += delta;
		if (typeof this.fetchDataCallback === 'function') {
		  	await this.fetchDataCallback(); // Wait for data fetching to complete
		}
		return this.data;
	}
}

export default Pagination;