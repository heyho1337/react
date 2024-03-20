import DbProps from '@customTypes/DbProps';
export class Symfony implements DbProps {

	protected baseUrl: string = "http://localhost:8000/api";
	
	async get(table: string, data: {} = {}) {
		try {
			const queryParams = new URLSearchParams(data).toString();
			const response = await fetch(`${this.baseUrl}/get/${table}/${queryParams}`);
			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}
			return await response.json();
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
	}
	
	async list(table: string, data: {} = {}) {
		try {
			const queryParams = new URLSearchParams(data).toString();
			const response = await fetch(`${this.baseUrl}/list/${table}`);
			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}
			return await response.json();
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
    }
	
	async set(table: string, data: {}) {
		try {
            const response = await fetch(`${this.baseUrl}/set/${table}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
			});
            if (!response.ok) {
                throw new Error('Failed to create data');
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating data:', error);
            throw error;
        }
    }
	
	async del(table: string, id: string) {
        try {
            const response = await fetch(`${this.baseUrl}/del/${table}/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete data');
            }
            return await response.json();
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    }
	
	async change(table: string, data: {}, where: {}) {
        try {
			const queryParams = new URLSearchParams(where).toString();
            const response = await fetch(`${this.baseUrl}/change/${table}/${queryParams}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Failed to update data');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating data:', error);
            throw error;
        }
    }
	
	async getById(table: string, data: []) {
		try {
			const queryParams = new URLSearchParams(data).toString();
			const response = await fetch(`${this.baseUrl}/get/${table}/${queryParams}`);
			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}
			return await response.json();
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
    }
}

const sym = new Symfony();
export default sym;