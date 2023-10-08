<template>
    <div class="mt-16 pa-12">
        <v-sheet class="mt-12">
            <div class="filter d-flex justify-space-around align-center mt-16">
                <v-sheet width="22%">
                    <v-autocomplete label="Województwo" :items="provinces" item-title="name" item-value="id"
                        v-model="provinceId" clearable></v-autocomplete>
                </v-sheet>
                <v-sheet width="22%">
                    <v-autocomplete clearable label="Miasto" :items="cities" item-title="name" item-value="id"
                        v-model="cityId"></v-autocomplete>
                </v-sheet>

                <v-sheet width="22%">
                    <v-autocomplete clearable label="Kategoria" :items="categories" item-title="name" item-value="id"
                        v-model="categoryId"></v-autocomplete>
                </v-sheet>

                <v-sheet width="22%">
                    <v-autocomplete clearable label="Stan zwierzęcia" :items="animalStatuses" item-title="name"
                        item-value="id" v-model="animalStatusId"></v-autocomplete>
                </v-sheet>
                <button class="mb-4"
                    style="background-color: #AAD037;width:80px;height:30px;border-radius: 10px;color: white;"
                    @click="listReports">
                    Szukaj
                </button>

            </div>
            <v-table>
                <thead>
                    <tr>
                        <th v-for="(header, index) in headers" :key="index" class="text-center">{{ header }}</th>
                    </tr>
                    <tr v-for="(report, index) in reports" :key="report.id">
                        <td class="text-center">
                            {{ index + 1 }}
                        </td>
                        <td class="text-center">
                            {{ report.category ? report.category.name : '' }}
                        </td>
                        <td class="text-center">
                            {{ report.location.province ? report.location.province.name : '' }}
                        </td>
                        <td class="text-center">
                            {{ report.location.city ? report.location.city.name : '' }}
                        </td>
                        <td class="text-center">
                            {{ report.street ? report.street : '-' }}
                        </td>
                        <td class="text-center">
                            {{ report.supportsCount }}
                        </td>
                        <td class="text-center">
                            {{ report.createdAt ? moment(report.createdAt).format("DD-M-Y HH:mm:ss") : '-' }}
                        </td>
                    </tr>
                </thead>
            </v-table>
            <div>
                <v-autocomplete label="Liczba reportów na stronę" :items="pagesOptions" item-title="name" item-value="size"
                    v-model="size" @update:modelValue="listReports"></v-autocomplete>
                <v-pagination v-model="page" :length="Math.ceil(allCounts / size)" rounded="circle"
                    @update:modelValue="listReports"></v-pagination>
            </div>
            <div class="d-flex justify-space-between">

                <div>
                    Jest <strong> {{ allCounts }}</strong> takich zgłoszeń
                </div>
                <div class="buttons">
                    <button class="ma-2"
                        style="background-color: #AAD037;width:140px;height:40px;border-radius: 10px;color: white;"
                        @click="downloadCSV(reports)">
                        Pobierz CSV
                    </button>
                    <button @click="downloadXLSX(reports)" class="ma-2"></button>
                </div>
            </div>

        </v-sheet>
    </div>
</template>
<script>
import moment from "moment"
export default {
    data() {
        return {
            cityId: null,
            provinceId: null,
            animalStatusId: null,
            categoryId: null,
            headers: ["Lp", "Gatunek", "Prowincja", "Miasto", "Ulica", "Ilość udostępnieć", "Data"],
            moment: moment,
            size: 10,
            page: 1,
            pagesOptions: [
                {
                    size: 10,
                    name: "10"
                },
                {
                    size: 25,
                    name: "25"
                },
                {
                    size: 0,
                    name: "Wszystkie"
                },
            ]
        }
    },
    computed: {
        cities() {
            return this.$store.getters.getCities;
        },
        provinces() {
            return this.$store.getters.getProvinces;
        },
        animalStatuses() {
            return this.$store.getters.getAnimalStatuses;
        },
        categories() {
            return this.$store.getters.getCategories;
        },
        reports() {
            return this.$store.getters.getReports;
        },
        allCounts() {
            return this.$store.getters.getAllCounts
        }
    },
    methods: {
        downloadCSV(reports) {
            let csvContent = "";
            // headers
            csvContent += "category,province,city\n";
            // data
            reports.forEach(report => {
                csvContent += `${report.category ? report.category.name : ""},${report.location.province ? report.location.province.name : ""},${report.location.city ? report.location.city.name : "", report.street, report.supportsCount, report.createdAt ? moment(report.createdAt).format("DD-M-Y HH:mm:ss") : ""}\n`;
            });

            const blob = new Blob([csvContent], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", "data.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        downloadXLSX(reports) {

        },
        listReports() {
            var params = { page: this.page - 1, size: this.size, cityId: this.cityId, provinceId: this.provinceId, animalStatusId: this.animalStatusId, categoryId: this.categoryId }
            this.$store.dispatch("listReports", params)
        }
    },
    created() {
        this.$store.dispatch("listCities")
        this.$store.dispatch("listProvinces")
        this.$store.dispatch("listAnimalStatuses")
        this.$store.dispatch("listCategories")
        this.listReports()
    }
}
</script>