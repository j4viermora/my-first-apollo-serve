import { ApolloServer, gql } from 'apollo-server';

const persons = [
	{
		name: 'midu',
		street: 'Calle frontend',
		city: 'Barcelona',
		id: '1',
	},
	{
		name: 'Javier',
		phone: '1234567',
		street: 'Calle frontend',
		city: 'Barcelona',
		id: '2',
	},
];

const typeDefs = gql`
	type Address {
		street: String
		city: String
	}

	type Person {
		name: String!
		phone: String
		street: String!
		city: String!
		address: Address!
		id: String!
	}

	type Query {
		personCount: Int!
		allPerson: [Person]!
		findPerson(name: String!): Person
	}
`;

const resolvers = {
	Query: {
		personCount: () => persons.length,
		allPerson: () => persons,
		findPerson: (root, args) => {
			const { name } = args;
			return persons.find((person) => person.name === name);
		},
	},
	Person: {
		address: (root) => {
			return {
				street: root.street,
				city: root.city,
			};
		},
	},
};
// deben llamarse de esa manera
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }) => {
	console.log(`Server run on port ${url}`);
});
