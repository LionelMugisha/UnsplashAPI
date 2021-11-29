import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';

const Picture = () => {

    const { id } = useParams();
	const [details, setDetails] = useState(null);

	useEffect(() => {
		fetch(
			`https://api.unsplash.com/photos/` +
				id +
				`?client_id=Ujio-nG7A240G-Hj4XtpMDgKnriKSl_REd9SUsgOZNY`
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setDetails(data);
			});
		// eslint-disable-next-line
	}, []);

    return (
        <div className="flex justify-evenly mt-1">
            {details ? (
                <div>
                    <Link to="/" className="flex justify-left font-bold">
                        Go Back
                    </Link>
                    <div className="max-w-sm rounded overflow-hidden shadow-lg mb-2">
                        <img className="w-full" src={details.urls.thumb} alt={details.user.name} />
                        <div className="px-6 py-4">
                            <p className="text-gray-700 text-base font-bold">
                            {details.alt_description}
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-bold text-gray-700 mr-2 mb-2">#Likes: {details.likes}</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-bold text-gray-700 mr-2 mb-2">#Author Name: {details.user.name}</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-bold text-gray-700 mr-2 mb-2">#Author Total Photos: {details.user.total_photos}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No data available!</p>
            )}
        </div>
    )
}

export default Picture;
