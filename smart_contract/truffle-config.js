/** @format */
require("dotenv").config()
const HDWalletProvider = require("@truffle/hdwallet-provider")

const private_key = [process.env.PRIVATE_KEY1]

module.exports = {
	networks: {
		// development: {
		//  host: "127.0.0.1",     // Localhost (default: none)
		//  port: 8545,            // Standard Ethereum port (default: none)
		//  network_id: "*",       // Any network (default: none)
		// },

		rinkeby: {
			provider: () =>
				new HDWalletProvider({
					privateKeys: private_key,
					providerOrUrl: process.env.INFURA_RINKEBY_URL,
					numberOfAddresses: 1,
				}),
			network_id: 4,
			gas: 5500000,
			confirmations: 2, // # of confs to wait between deployments. (default: 0)
			timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
			skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )yar
		},
	},

	// Set default mocha options here, use special reporters etc.
	mocha: {
		// timeout: 100000
	},

	contracts_build_directory: "../client/src/contracts/",
	compilers: {
		solc: {
			version: "0.8.0", // Fetch exact version from solc-bin (default: truffle's version)
			settings: {
				optimizer: {
					enabled: true,
					runs: 200,
				},
				evmVersion: "byzantium",
			},
		},
	},
}
