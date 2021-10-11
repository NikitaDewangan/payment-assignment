import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.scss";

const Payments = () => {
  const paymentsUrl = 'http://localhost:9001/api/payments';  
  const [paymentList, setPayment] = useState([]);  
  const [nextPage, setNextPageIndex] = useState('');  

  useEffect(() => {
    fetch(paymentsUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const filterPendingRequest = data.results.filter((payments) => payments.paymentStatus !== 'P');
            console.log(filterPendingRequest);
            setPayment(filterPendingRequest);
            data.metaDatal.hasMoreElements ? setNextPageIndex(data.metaDatal.nextPageIndex) : setNextPageIndex('');
        });
  }, []);

  const loadMoreItems = () => {
      console.log('nextPage.length....', nextPage.length)
    if(nextPage.length) {
        fetch(`${paymentsUrl}?pageIndex=${nextPage}`)
        .then(response => response.json())
        .then(data => {
            console.log('load more...', data);
            data.metaDatal.hasMoreElements ? setNextPageIndex(data.metaDatal.nextPageIndex) : setNextPageIndex('');
            const filterPendingRequest = data.results.filter((payments) => payments.paymentStatus !== 'P');
            console.log(filterPendingRequest);
            setPayment([...paymentList, ...filterPendingRequest]);
        });
    }
  };


  return (
            <div>
                <div>
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Payment Amount</th>
                            <th>Payment Currency</th>
                            <th>Payment Date</th>
                            <th>Payment Status</th>
                            <th>Payment Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paymentList.map((payment, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{payment.paymentAmount}</td>
                                        <td>{payment.paymentCurrency}</td>
                                        <td>{payment.paymentDate}</td>
                                        <td>{payment.paymentStatus}</td>
                                        <td>{payment.paymentType}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </Table>
                </div>
                <div>
                { !nextPage.length ? <div> No more Elements</div>: <Button onClick={loadMoreItems}>Load More</Button> }
                </div>
            </div>
  );
};

export default Payments;
