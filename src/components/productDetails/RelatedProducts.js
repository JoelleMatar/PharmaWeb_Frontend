import { RelatedProducts } from '@algolia/recommend-react';
import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react';
import recommend from '@algolia/recommend';

import '@algolia/ui-components-horizontal-slider-theme';
import { useEffect, useState } from 'react';
import { getProducts } from '../../api';

const recommendClient = recommend('QHDS01X04N', 'ce85478d2f0174065944ac523158bb43');
const indexName = 'pw3';

function RelatedItem({item}) {
    let arr = []
    console.log("ITEM", item)

    const [products, setProducts] = useState([])
    useEffect(async () => {
        const res = await getProducts();
        // console.log("Res", res)
        setProducts(res.data.data)
        // console.log("arr", arr[0])
    }, [])

     console.log("productss", products)
     
    return (
        <pre>
            {
                console.log("lrng",products.length)
            }
            {
                JSON.stringify(item._score) > 75 ? (
                    products.filter(prod => prod.productName === item.productName).map(prod => {
                        return (
                            <code>{prod.productName}</code>
                        )
                    })
                ) : ''
            }
        </pre>
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