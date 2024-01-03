import { getSearchListings } from '@/api/listing.api';
import Search from '@/features/Search';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SearchPage() {
  const { search: searchParams } = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const searchTermFromUrl = urlParams.get('searchTerm');

  const navigate = useNavigate();
  const [sidebarData, setSidebarData] = useState({
    searchTerm: searchTermFromUrl || '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
  });

  // const [isLoading, setIsLoading] = useState(false);
  // const [listings, setListings] = useState(null);

  const onChangeHandler = (evt) => {
    const inputId = evt.target.id;
    const value = evt.target.value;
    const checked = evt.target.checked;

    const type = ['all', 'rent', 'sale'];
    const aminities = ['parking', 'furnished', 'offer'];

    if (type.includes(inputId)) {
      setSidebarData({ ...sidebarData, type: inputId });
    }

    if (inputId === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: value });
    }

    if (aminities.includes(inputId)) {
      setSidebarData({
        ...sidebarData,
        [inputId]: checked || checked === 'true' ? true : false,
      });
    }

    if (inputId === 'sort_order') {
      const sort = value.split('_')[0] || 'createdAt';
      const order = value.split('_')[1] || 'desc';

      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('type', sidebarData.type);
    urlParams.set('parking', sidebarData.parking);
    urlParams.set('furnished', sidebarData.furnished);
    urlParams.set('offer', sidebarData.offer);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('order', sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const { isLoading, data: listings } = useQuery({
    queryKey: ['listings', searchParams],
    queryFn: () => getSearchListings(searchParams),
  });

  // useEffect(() => {
  //   const fetchListings = async () => {
  //     setIsLoading(true);
  //     const searchQuery = urlParams.toString();
  //     const listings = await getSearchListings(searchQuery);
  //     setListings(listings);
  //     setIsLoading(false);
  //   };
  //   fetchListings();
  // }, [location.search]);

  return (
    <Search
      onSubmitHandler={onSubmitHandler}
      sidebarData={sidebarData}
      onChangeHandler={onChangeHandler}
      listings={listings}
      isLoading={isLoading}
    />
  );
}
