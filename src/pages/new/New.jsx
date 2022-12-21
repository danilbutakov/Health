import './new.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { fs } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';

const New = ({ title }) => {
	const [userName, setUserName] = useState('');
	const [userFam, setUserFam] = useState('');
	const [userOtch, setUserOtch] = useState('');
	const [userDate, setUserDate] = useState('');
	const [userTel, setUserTel] = useState('');

	const [year, month, day] = userDate.split('-');
	const resultDate = `${day}-${month}-${year}`;

	const addPacient = () => {
		const id = uuidv4();
		try {
			setDoc(doc(fs, 'pacients', id), {
				name: userName,
				secondName: userFam,
				thirdName: userOtch,
				date: resultDate,
				phone: userTel,
				id: id
			}).then(() => {
				alert('Вы успешно создали пациента');
				setUserName('');
				setUserFam('');
				setUserOtch('');
				setUserDate('');
				setUserTel('');
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='new'>
			<Sidebar />
			<div className='newContainer'>
				<Navbar />
				<div className='top'>
					<h1>{title}</h1>
				</div>
				<div className='bottom'>
					<div className='right'>
						<div className='form'>
							<div className='formInput'>
								<label>Имя</label>
								<input
									value={userName}
									onChange={e => setUserName(e.target.value)}
									placeholder='Введите Имя'
									type='text'
								/>
							</div>
							<div className='formInput'>
								<label>Фамилия</label>
								<input
									value={userFam}
									onChange={e => setUserFam(e.target.value)}
									placeholder='Введите Фамилию'
									type='text'
								/>
							</div>
							<div className='formInput'>
								<label>Отчество</label>
								<input
									value={userOtch}
									onChange={e => setUserOtch(e.target.value)}
									placeholder='Введите Отчество'
									type='text'
								/>
							</div>
							<div className='formInput'>
								<label>Дата рождения</label>
								<input
									value={userDate}
									onChange={e => setUserDate(e.target.value)}
									placeholder='Введите дату рождения'
									type='date'
								/>
							</div>
							<div className='formInput'>
								<label>Номер телефона</label>
								<input
									value={userTel}
									onChange={e => setUserTel(e.target.value)}
									placeholder='Введите номер телефона'
									type='tel'
								/>
							</div>
							<button onClick={addPacient}>Создать</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default New;
