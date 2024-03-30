type AdministrativeUnit = {
    fullName: string,
    fullNameEn: string,
    shortName: string,
    shortNameEn: string,
    codeName: string,
    codeNameEn: string
}

// Define an empty map to store the data
export const administrativeUnitsMap = new Map<number, AdministrativeUnit>();

// Function to add data to the map
function addToMap(
    id: number,
    fullName: string,
    fullNameEn: string,
    shortName: string,
    shortNameEn: string,
    codeName: string,
    codeNameEn: string
) {
    administrativeUnitsMap.set(id, {
        fullName,
        fullNameEn,
        shortName,
        shortNameEn,
        codeName,
        codeNameEn,
    });
}

// Inserted data from SQL statements
addToMap(1, 'Thành phố trực thuộc trung ương', 'Municipality', 'Thành phố', 'City', 'thanh_pho_truc_thuoc_trung_uong', 'municipality');
addToMap(2, 'Tỉnh', 'Province', 'Tỉnh', 'Province', 'tinh', 'province');
addToMap(3, 'Thành phố thuộc thành phố trực thuộc trung ương', 'Municipal city', 'Thành phố', 'City', 'thanh_pho_thuoc_thanh_pho_truc_thuoc_trung_uong', 'municipal_city');
addToMap(4, 'Thành phố thuộc tỉnh', 'Provincial city', 'Thành phố', 'City', 'thanh_pho_thuoc_tinh', 'provincial_city');
addToMap(5, 'Quận', 'Urban district', 'Quận', 'District', 'quan', 'urban_district');
addToMap(6, 'Thị xã', 'District-level town', 'Thị xã', 'Town', 'thi_xa', 'district_level_town');
addToMap(7, 'Huyện', 'District', 'Huyện', 'District', 'huyen', 'district');
addToMap(8, 'Phường', 'Ward', 'Phường', 'Ward', 'phuong', 'ward');
addToMap(9, 'Thị trấn', 'Commune-level town', 'Thị trấn', 'Township', 'thi_tran', 'commune_level_town');
addToMap(10, 'Xã', 'Commune', 'Xã', 'Commune', 'xa', 'commune');