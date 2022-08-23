import { RelatedProducts } from '@algolia/recommend-react';
import recommend from '@algolia/recommend';

import { useEffect, useState } from 'react';
import { getProducts } from '../../api';
import { useNavigate } from 'react-router-dom';
import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react';
import '@algolia/ui-components-horizontal-slider-theme';
const recommendClient = recommend('QHDS01X04N', 'ce85478d2f0174065944ac523158bb43');
const indexName = 'pw3';

function RelatedItem({item}) {
    const navigate = useNavigate()
     const [products, setProducts] = useState([])

    useEffect(async () => {
        const res = await getProducts();
        setProducts(res.data.data)
    }, [])

    const goToProd = (id) => {
        navigate('/home/product/' + id)
    }

    return (
        <span>
            {
                JSON.stringify(item._score) > 75 ? (
                    products?.filter(prod => prod.productName === item.productName).map(prod => {
                        console.log("jskkaa", prod)
                        return (
                            <p onClick={() => goToProd(prod._id)}>{prod.productName}</p>
                        )
                    })
                ) : (<div style={{display:'none'}}></div>)
            }
        </span>
    );
}

function AppProducts({ item }) {
    // ...
    const ids = []
    ids.push(item._id)
    console.log("jsksks", ids)
   

  
    return (
        <div>
            <RelatedProducts
                recommendClient={recommendClient}
                indexName={indexName}
                // objectIDs={['62b853342230af32158c385d']}
                objectIDs={[item.productName]}
                itemComponent={RelatedItem}
                view={HorizontalSlider}
            />
        </div>

    );
}

export default AppProducts

// export default RelatedIngreditentsProducts;