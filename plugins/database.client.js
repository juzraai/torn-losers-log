import Dexie from 'dexie';

export const db = new Dexie('TLL');

// TODO add new db versions here, keep the old ones!

db.version(1).stores({
	attacks: 'code,attacker_id,defender_id,paid,result,timestamp_ended',
	players: 'id',
});

// Syntax: 'PK,key,key,...'
// Docs: https://dexie.org/docs/Version/Version.stores()

export default (_, inject) => {
	inject('db', db);
};
