import { firestore } from '../database/firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const addTrip = async (tripData) => {
    try {
        const docRef = await addDoc(collection(firestore, 'trips'), tripData);
        console.log('Viagem salva: ', docRef.id);
    } catch (error) {
        console.error('Erro Post: ', error);
        throw error;
    }
};

const getTrips = async () => {
    try {
        const querySnapshot = await getDocs(collection(firestore, 'trips'));
        const trips = [];
        querySnapshot.forEach((doc) => {
            trips.push({ ...doc.data(), id: doc.id });
        });
        return trips;
    } catch (error) {
        console.error('Erro Get: ', error);
        throw error;
    }
};

const clearTrips = async () => {
    try {
        const tripCollectionRef = collection(firestore, 'trips');
        const tripSnapshot = await getDocs(tripCollectionRef);

        tripSnapshot.forEach(async (tripDoc) => {
            try {
                await deleteDoc(doc(firestore, 'trips', tripDoc.id));
            } catch (error) {
                console.error('Erro ao deletar viagem: ', error);
                throw error;
            }
        });
    } catch (error) {
        console.error('Erro Delete:', error);
        throw error;
    }
};


export { addTrip, getTrips, clearTrips };