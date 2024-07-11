import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../firebase';

const ViewOrderDetails = () => {
    const firebase = useFirebase();
    const params = useParams();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs))
    }, [])
    console.log(orders)
    return (
        <div className="container mt-5">
          <h1 className="text-center mb-4">Order Detail</h1>
          <div className="row">
            {orders.map((order) => {
              const data = order.data();
              return (
                <div key={order.id} className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      {/* <h5 className="card-title">Order Details</h5> */}
                      <p className="card-text">
                        <strong>Ordered by:</strong> {data.userEmail}
                      </p>
                      <p className="card-text">
                        <strong>On:</strong> {data.orderTime}
                      </p>
                      <p className="card-text">
                        <strong>Quantity:</strong> {data.qty}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
}

export default ViewOrderDetails
