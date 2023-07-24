// export const environment: { [k: string]: string } = {
// 	api: 'http://localhost:3000',
// };
export const environment: {
	api: string;
	apiProd: string;
	production: boolean;
} = {
	production: false,
	api: 'http://localhost:3000',
	apiProd: 'https://chat-node-backend-production.up.railway.app',
};
