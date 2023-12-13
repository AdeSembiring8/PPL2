import React, { useEffect, useState } from 'react';
import { handleCloseModalAlamat } from './page.jsx';


const ProvinceDropdown = ({ onSelectProvince, oneCloseModalAlamat }) => {
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedRegencyId, setSelectedRegencyId] = useState('');
    const [selectedDistrictId, setSelectedDistictId] = useState('');
    const [selectedVillageId, setSelectedVillageId] = useState('');
    const [valueAlamat, setValueAlamat] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);
    const [isLoadingRegencies, setIsLoadingRegencies] = useState(false);
    const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
    const [isLoadingVillages, setIsLoadingVillages] = useState(false);

    const [selectedProvinceName, setSelectedProvinceName] = useState('');
    const [selectedRegencyName, setSelectedRegencyName] = useState('');
    const [selectedDistrictName, setSelectedDistrictName] = useState('');
    const [selectedVillageName, setSelectedVillageName] = useState('');

    // const handleCloseModal = () => {
    //     // Meneruskan nilai-nilai terpilih ke page.jsx setelah modal ditutup
    //     onCloseModalAlamat({
    //         selectedProvince,
    //         selectedProvinceName,
    //         selectedRegencyId,
    //         selectedRegencyName,
    //         selectedDistrictId,
    //         selectedDistrictName,
    //         selectedVillageId,
    //         selectedVillageName,
    //     });
    // };

    useEffect(() => {
        async function fetchProvinces() {
            try {
                const response = await fetch('http://52.221.249.20:8080/api/provinces');
                if (response.ok) {
                    const data = await response.json();
                    setProvinces(data.data);
                } else {
                    console.error('Failed to fetch provinces:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        }

        fetchProvinces();
    }, []);

    const fetchRegenciesByProvinceId = async (provinceId) => {
        setIsLoadingRegencies(true);
        try {
            const response = await fetch(`http://52.221.249.20:8080/api/regencies/${provinceId}`);
            if (response.ok) {
                const data = await response.json();
                setRegencies(data.data);
            } else {
                console.error('Failed to fetch regencies:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching regencies:', error);
        } finally {
            setIsLoadingRegencies(false);
        }
    };

    const fetchDistrictsByRegencyId = async (regencyId) => {
        setIsLoadingDistricts(true);
        try {
            const response = await fetch(`http://52.221.249.20:8080/api/districts/${regencyId}`);
            if (response.ok) {
                const data = await response.json();
                setDistricts(data.data);
            } else {
                console.error('Failed to fetch districts:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching districts:', error);
        } finally {
            setIsLoadingDistricts(false);
        }
    };

    const fetchVillagesByDistrictId = async (districtId) => {
        setIsLoadingVillages(true);
        try {
            const response = await fetch(`http://52.221.249.20:8080/api/villages/${districtId}`);
            if (response.ok) {
                const data = await response.json();
                setVillages(data.data);
            } else {
                console.error('Failed to fetch villages:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching villages:', error);
        } finally {
            setIsLoadingVillages(false);
        }
    };

    const handleProvinceChange = (event) => {
        const selectedValue = event.target.value;
        const selectedProvinceName = event.target.options[event.target.selectedIndex].text;
        setSelectedProvince(selectedValue);
        setSelectedProvinceName(selectedProvinceName);
        onSelectProvince({
            provinceId: selectedValue,
            provinceName: selectedProvinceName,

            regencyId: '',
            regencyName: '',

            districtId: '',
            districtName: '',

            villageId: '',
            villageName: ''
        });
        if (selectedValue !== '') {
            fetchRegenciesByProvinceId(selectedValue);
            setDistricts([]);
            setVillages([]);
        } else {
            setRegencies([]);
            setDistricts([]);
            setVillages([]);
        }
    };

    const handleRegencyChange = (event) => {
        const selectedValue = event.target.value;
        const selectedRegencyName = event.target.options[event.target.selectedIndex].text;
        setSelectedRegencyId(selectedValue);
        setSelectedRegencyName(selectedRegencyName);
        onSelectProvince({
            provinceId: selectedProvince,
            provinceName: selectedProvinceName,

            regencyId: selectedValue,
            regencyName: selectedRegencyName,

            districtId: '',
            districtName: '',

            villageId: '',
            villageName: ''
        })
        if (selectedValue !== '') {
            fetchDistrictsByRegencyId(selectedValue);
            setVillages([]);
            setSelectedRegencyId(selectedValue); // Atur ulang nilai ID kabupaten/kota yang dipilih
        } else {
            setDistricts([]);
            setVillages([]);
        }
    };

    const handleDistrictChange = (event) => {
        const selectedValue = event.target.value;
        const selectedDistrictName = event.target.options[event.target.selectedIndex].text;
        setSelectedDistictId(selectedValue);
        setSelectedDistrictName(selectedDistrictName);
        onSelectProvince({
            provinceId: selectedProvince,
            provinceName: selectedProvinceName,

            regencyId: selectedRegencyId,
            regencyName: selectedRegencyName,

            districtId: selectedValue,
            districtName: selectedDistrictName,

            villageId: '',
            villageName: ''
        })
        if (selectedValue !== '') {
            fetchVillagesByDistrictId(selectedValue);
            setSelectedDistictId(selectedValue)
        } else {
            setVillages([]);
        }
    };


    const handleVillageChange = (event) => {
        const selectedValue = event.target.value;
        const selectedVillageName = event.target.options[event.target.selectedIndex].text;
        setSelectedVillageId(selectedValue);
        setSelectedVillageName(selectedVillageName);
        onSelectProvince({
            provinceId: selectedProvince,
            provinceName: selectedProvinceName,

            regencyId: selectedRegencyId,
            regencyName: selectedRegencyName,

            districtId: selectedDistrictId,
            districtName: selectedDistrictName,

            villageId: selectedValue,
            villageName: selectedVillageName
        })
    };

    const handleAddAddress = (e) => {
        const valueAlamat = e.target.value;
        setValueAlamat(valueAlamat);
    }

    const handleCloseModal = () => {
        oneCloseModalAlamat(valueAlamat);
    }

    console.log(valueAlamat);

    return (
        <div className="block rounded-lg bg-custom-F2F2F2 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] w-fit">
            <div className=" text-lg">
            <h1 className='text-black text-xl font-semibold text-center pb-5'> Ubah Alamat Pengiriman </h1>
                <div className='mb-4'>
                    <label className=' font-bold' htmlFor="Alamat">Alamat </label>
                    <div className=' text-base'>
                        <textarea value={valueAlamat} onChange={handleAddAddress}
                            className=' rounded-xl  p-2 w-full resize-none' rows={2} />
                    </div>
                </div>
                <div className='mb-4'>
                    <label className=' text-lg font-bold' htmlFor="provinceDropdown">Provinsi</label>
                    <div>
                        <select className=' rounded-xl w-fit p-1'
                            id="provinceDropdown"
                            value={selectedProvince}
                            onChange={handleProvinceChange}
                        >
                            <option value="">Pilih Provinsi</option>
                            {provinces.map((province) => (
                                <option key={province.id} value={province.id}>
                                    {province.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {isLoadingRegencies && <p>Loading Regencies...</p>}

                <div className='mb-4'>
                    <label className=' text-lg font-bold' htmlFor="regencyDropdown">Kabupaten/Kota </label>
                    <div>
                        <select className=' rounded-xl w-full p-1'
                            id="regencyDropdown"
                            value={regencies.id}
                            onChange={handleRegencyChange}
                        >
                            <option value="">Pilih Kabupaten/Kota</option>
                            {regencies.map((regency) => (
                                <option key={regency.id} value={regency.id}>
                                    {regency.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {isLoadingDistricts && <p>Loading Districts...</p>}

                <div className='mb-4'>
                    <label className=' text-lg font-bold' htmlFor="districtDropdown">Pilih Kecamatan:</label>
                    <div>
                        <select className=' rounded-xl w-full p-1'
                            id="districtDropdown"
                            value={districts.id}
                            onChange={handleDistrictChange}
                        >
                            <option value="">Pilih Kecamatan</option>
                            {districts.map((district) => (
                                <option key={district.id} value={district.id}>
                                    {district.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {isLoadingVillages && <p>Loading Villages...</p>}

                <div className='mb-4'>
                    <label className=' text-lg font-bold' htmlFor="villageDropdown">Pilih Kelurahan:</label>
                    <div>
                        <select className=' rounded-xl w-full p-1'
                            id="villageDropdown"
                            value={villages.id}
                            onChange={handleVillageChange}
                        >
                            <option value="">Pilih Kelurahan</option>
                            {villages.map((village) => (
                                <option key={village.id} value={village.id}>
                                    {village.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <button
                onClick={handleCloseModal}
                className=" text-white bg-custom-92B150 w-fit p-2 rounded-lg my-5">
                Simpan Alamat
            </button>
        </div>
    );
};

export default ProvinceDropdown;
