import './datatable.scss';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query } from 'firebase/firestore';
import { fs } from '../../firebase.js';
import { useEffect, useState } from 'react';

const Datatable = () => {
	const [pacients, setPacients] = useState([]);
	const navigate = useNavigate();

	const fetchData = async () => {
		const q = query(collection(fs, 'pacients'));

		await getDocs(q).then(snapshot => {
			const newData = snapshot.docs.map(doc => ({
				...doc.data()
			}));
			setPacients(newData);
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className='datatable'>
			<div className='datatableTitle'>
				Добавить нового пациента
				<Link to='/pacients/new' className='link'>
					Добавить нового
				</Link>
			</div>
			<div className='table'>
				{pacients.map(pac => (
					<div className='tableElem' key={pac.id}>
						<div className='infoTable'>
							<span>{pac.name + ' ' + pac.secondName + ' ' + pac.thirdName + ' ' + pac.date}</span>
						</div>
						<div className='cellAction'>
							<div
								onClick={() =>
									navigate(`/pacients/:${pac.id}`, { state: { pac } })
								}
								style={{ textDecoration: 'none' }}>
								<div className='viewButton'>Просмотр</div>
							</div>
							<div className='deleteButton'>Удалить</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Datatable;
