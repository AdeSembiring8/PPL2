import React, { useEffect, useState } from 'react';

const ProvinceDropdown = ({ onSelectProvince }) => {
    const [selectedProvince, setSelectedProvince] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);
    const [isLoadingRegencies, setIsLoadingRegencies] = useState(false);
    const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
    const [isLoadingVillages, setIsLoadingVillages] = useState(false);

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
        setSelectedProvince(selectedValue);
        onSelectProvince(selectedValue);
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
        const selectedValueRegency = event.target.value;
        if (selectedValueRegency !== '') {
            fetchDistrictsByRegencyId(selectedValueRegency);
            setVillages([]);
        } else {
            setDistricts([]);
            setVillages([]);
        }
    };

    const handleDistrictChange = (event) => {
        const selectedValueDistrict = event.target.value;
        if (selectedValueDistrict !== '') {
            fetchVillagesByDistrictId(selectedValueDistrict);
        } else {
            setVillages([]);
        }
    };

    return (
        <div>
            <label htmlFor="provinceDropdown">Pilih Provinsi:</label>
            <select
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

            {isLoadingRegencies && <p>Loading Regencies...</p>}

            {regencies.length > 0 && (
                <div>
                    <label htmlFor="regencyDropdown">Pilih Kabupaten/Kota:</label>
                    <select
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
            )}

            {isLoadingDistricts && <p>Loading Districts...</p>}

            {districts.length > 0 && (
                <div>
                    <label htmlFor="districtDropdown">Pilih Kecamatan:</label>
                    <select
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
            )}

            {isLoadingVillages && <p>Loading Villages...</p>}

            {villages.length > 0 && (
                <div>
                    <label htmlFor="villageDropdown">Pilih Kelurahan:</label>
                    <select
                        id="villageDropdown"
                        value={villages.id}
                        onChange={() => { }}
                    >
                        <option value="">Pilih Kelurahan</option>
                        {villages.map((village) => (
                            <option key={village.id} value={village.id}>
                                {village.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            
        </div>
    );
};

export default ProvinceDropdown;
