"use client";
import { useEffect, useState } from 'react';
import FireStore from '@db/FireStore';
import Pagination from '@common/Pagination'; // Adjust the path


class Dota {

	private stop: boolean = false;
	private loading: boolean = false;
	private data = {
		players: [],
		status: false,
		msg: '',
		currentPage: 1,
    	pageSize: 10
	};
	private pagination;

	constructor() {}

	async getPlayers() {
		if (!this.stop && !this.loading) {
			try {
				this.loading = true;
				const response = await fetch(`https://api.opendota.com/api/proPlayers?page=${this.data.currentPage}&pageSize=${this.data.pageSize}`);
				if (response.ok) {
					const players = await response.json();
					this.setData({ players, status: true });
					this.pagination = new Pagination(() => this.getPlayers(), this.data);
					await this.pagination.changePage(0);
				}
				else {
					this.setData({ status: false, msg: `Error fetching pro players: ${response.status} ${response.statusText}` });
				}
			}
			catch (error) {
				this.setData({ status: false, msg: `Error fetching pro players: ${error.message}` });
			}
			finally {
				this.loading = false;
			}

			return this.data;
		}
  	}

  	setData(updatedData) {
    	this.data = { ...this.data, ...updatedData };
		if (this.data.status) {
			this.stop = true;
		}
	}

	showPlayers(playersData) {
		const { players, currentPage, pageSize } = this.data;
		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		const displayedPlayers = players.slice(startIndex, endIndex);
    	return (
			<div>
				<h1>Players</h1>
				<ul>
					{displayedPlayers.map((player) => (
						<li key={player.account_id}>{player.name}</li>
					))}
				</ul>
				{this.pagination && this.pagination.renderPagination(this.data)}
			</div>
		);
	}
}

const dota = new Dota();
export default dota;
