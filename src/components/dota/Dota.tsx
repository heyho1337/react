"use client";
import { useEffect, useState } from 'react';
import FireStore from '@db/FireStore';
import Pagination from '@common/Pagination'; // Adjust the path


class Dota {

	private stop: boolean = false;
	private loading: boolean = false;
	private data = {
		players: [],
		chunkedPlayers: [],
		status: false,
		msg: ''
	};

	constructor() {}

	async getPlayers() {
		if (!this.stop && !this.loading) {
		  	try {
				this.loading = true;
				const response = await fetch(`http://api.opendota.com/api/proPlayers`);
	  
				if (response.ok) {
			  		const players = await response.json();
					this.setData({ players, status: true });
					this.chunkPlayers();
				}
				else {
			  		const errorMessage = `Error fetching pro players: ${response.status} ${response.statusText}`;
			  		console.error(errorMessage);
			  		this.setData({ status: false, msg: errorMessage });
				}
			}
			catch (error) {
				const errorMessage = `Error fetching pro players: ${error.message}`;
				console.error(errorMessage);
				this.setData({ status: false, msg: errorMessage });
			}
			finally {
				this.loading = false;
		  	}
	  
		  	return this.data;
		}
	}
	
	
	chunkPlayers() {
		const chunkSize = 25;
		const { players } = this.data;
		const chunkedPlayers = [];
	
		for (let i = 0; i < players.length; i += chunkSize) {
			const chunk = players.slice(i, i + chunkSize);
			chunkedPlayers.push(chunk);
		}
	
		this.setData({ chunkedPlayers });
	}

  	setData(updatedData) {
    	this.data = { ...this.data, ...updatedData };
		if (this.data.status) {
			this.stop = true;
		}
	}
}

const dota = new Dota();
export default dota;
