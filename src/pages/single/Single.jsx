import React, { useEffect, useState } from 'react';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { useLocation } from 'react-router-dom';
import {
	collection,
	doc,
	getDocs,
	onSnapshot,
	query,
	setDoc,
	where
} from 'firebase/firestore';
import { fs } from '../../firebase';
import { nanoid } from 'nanoid';

const Single = () => {
	const location = useLocation();
	const pacient = location.state.pac;

	const randUid = nanoid();
	const pacRef = doc(fs, 'pacientsInfo', randUid);
	const delay = 1;

	const [paciki, setPaciki] = useState([]);
	const [pacikiFiltered, setPacikiFiltered] = useState([]);

	const [dateVisit, setDateVIsit] = useState('');
	const [userHistory, setUserHistory] = useState('');
	const [userCourse, setUserCourse] = useState('');

	const q = query(collection(fs, 'pacientsInfo'));

	onSnapshot(q, snapshot => {
		const newData = snapshot.docs.map(doc => ({
			...doc.data()
		}));
		setPaciki(newData);
		const res = paciki.filter(pacik => {
			return pacik.id === pacient.id;
		});
		setPacikiFiltered(res);
	});

	const writeUserInfo = async () => {
		if (dateVisit !== '' && userCourse !== '' && userHistory !== '') {
			await setDoc(pacRef, {
				dateVisit: dateVisit,
				userHistory: userHistory,
				userCourse: userCourse,
				id: pacient.id,
				randId: randUid
			})
				.then(() => {
					console.log('good write data');
					setDateVIsit('');
					setUserCourse('');
					setUserHistory('');
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			alert('Заполнены не все поля');
		}
	};

	return (
		<div className='single'>
			<Sidebar />
			<div className='singleContainer'>
				<Navbar />
				<div className='top'>
					<div className='left'>
						<h1 className='title'>ИНФОРМАЦИЯ</h1>
						<div className='item'>
							<AccountCircleTwoToneIcon className='itemImg' />
							<div className='details'>
								<h1 className='itemTitle'>
									{pacient.name +
										' ' +
										pacient.secondName +
										' ' +
										pacient.thirdName}
								</h1>
								<div className='detailItem'>
									<span className='itemKey'>Дата рождения: </span>
									<span className='itemValue'>{pacient.date}</span>
								</div>
								<div className='detailItem'>
									<span className='itemKey'>Номер телефона: </span>
									<span className='itemValue'>{pacient.phone}</span>
								</div>
							</div>
						</div>
					</div>
					<div className='right'>
						<h1 className='title'>ДОБАВИТЬ ПОСЕЩЕНИЕ</h1>
						<div className='rightInputs'>
							<div className='inputItem'>
								<span className='inputKey'>Дата посещения: </span>
								<input
									type='date'
									placeholder='дата посещения'
									value={dateVisit}
									onChange={e => setDateVIsit(e.target.value)}
								/>
							</div>
							<div className='inputItem'>
								<span className='inputKey'>История: </span>
								<input
									type='text'
									placeholder='история болезни'
									value={userHistory}
									onChange={e => setUserHistory(e.target.value)}
								/>
							</div>
							<div className='inputItem'>
								<span className='inputKey'>Курс лечения: </span>
								<input
									type='text'
									placeholder='курс лечения'
									value={userCourse}
									onChange={e => setUserCourse(e.target.value)}
								/>
							</div>
						</div>
						<div className='buttonAdd' onClick={writeUserInfo}>
							Применить
						</div>
					</div>
				</div>

				<div className='bottom'>
					<h1 className='title'>ИСТОРИЯ ПАЦИЕНТА</h1>
					{pacikiFiltered.map((pacik, key) => (
						<div key={key} className='bottomInfo'>
							<div className='date'>
								<h1 className='datePacient'>Дата посещения:</h1>
								<span className='historyInfo'>{pacik.dateVisit}</span>
							</div>
							<div className='date'>
								<h1 className='datePacient'>История: </h1>
								<span className='historyInfo'>{pacik.userHistory}</span>
							</div>
							<div className='date'>
								<h1 className='datePacient'>Курс: </h1>
								<span className='historyInfo'>{pacik.userCourse}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Single;
