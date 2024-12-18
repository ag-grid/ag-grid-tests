<template>
    <div style="height: 100%">
        <select v-model.number="paginationPageSize">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
            <option>500</option>
        </select>
    <AgGridVue
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine-dark"
        :columnDefs="columnDefs"
        @grid-ready="onGridReady"
        rowModelType="serverSide"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :paginationPageSizeSelector="[10,20,40,100, 500]"
        :cacheBlockSize="paginationPageSize"
    ></AgGridVue>
    </div>
</template>

<script setup>
import alasql from "alasql";
import { AgGridVue } from 'ag-grid-vue3';
import {computed, ref} from "vue";
import GridCellUser from "@/components/GridCellUser.vue";

const gridApi = ref();
const gridColumnApi = ref();
const pageSize = ref(10);
const serverSideDataSource = ref();
defineOptions({
    components: {
        GridCellUser,
    }
})
const paginationPageSize = computed({
    get() {
        return pageSize.value;
    },
    set(value) {
        pageSize.value = value;
    }
})
const columnDefs = [
    { 
        field: 'athlete', 
    cellRenderer: 'GridCellUser'
    },
];

function getServerSideDatasource(server) {
    return {
        async getRows(params) {
            console.log('[Datasource] - rows requested by grid: ', params.request);
            const response = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({
                        data: [{ name: 'blah' }],
                        pagination: {
                            total: 1,
                        },
                    });
                }, 1000);
            });
            // call the success callback
            params.success({
                rowData: response.data,
                rowCount: response.pagination.total,
            });
        },
    };
}

const onGridReady = (params) => {
    gridApi.value = params.api;
    gridColumnApi.value = params.columnApi;

    // setup the fake server with entire dataset
    var fakeServer = new FakeServer();
    // create datasource with a reference to the fake server
    var datasource = (serverSideDataSource.value = getServerSideDatasource(
        fakeServer
    ));
    // register the datasource with the grid
    // params.api.setGridOption('serverSideDatasource', datasource);
  params.api.setServerSideDatasource(datasource);
};

const allData = [
    
    {
        athlete: 'Chad Hedrick',
        age: 28,
        country: 'United States',
        year: 2006,
        date: '26/02/2006',
        sport: 'Speed Skating',
        gold: 1,
        silver: 1,
        bronze: 1,
        total: 3,
        id: 99,
    },
    {
        athlete: 'Jochem Uytdehaage',
        age: 25,
        country: 'Netherlands',
        year: 2002,
        date: '24/02/2002',
        sport: 'Speed Skating',
        gold: 2,
        silver: 1,
        bronze: 0,
        total: 3,
        id: 100,
    },
]


// This fake server uses http://alasql.org/ to mimic how a real server
// might generate sql queries from the Server-Side Row Model request.
// To keep things simple it does the bare minimum to support the example.
function FakeServer() {
    alasql.options.cache = false;

    return {
        getData: function (request) {
            var results = executeQuery(request);

            return {
                success: true,
                rows: results,
                lastRow: getLastRowIndex(request),
            };
        },
        getCountries: function () {
            var SQL = 'SELECT DISTINCT country FROM ? ORDER BY country ASC';

            return alasql(SQL, [allData]).map(function (x) {
                return x.country;
            });
        },
    };

    function executeQuery(request) {
        var sql = buildSql(request);

        console.log('[FakeServer] - about to execute query:', sql);

        return alasql(sql, [allData]);
    }

    function buildSql(request) {
        return (
            'SELECT * FROM ?' +
            whereSql(request) +
            orderBySql(request) +
            limitSql(request)
        );
    }

    function whereSql(request) {
        var whereParts = [];
        var filterModel = request.filterModel;

        if (filterModel) {
            Object.keys(filterModel).forEach(function (columnKey) {
                var filter = filterModel[columnKey];

                if (filter.filterType === 'set') {
                    whereParts.push(
                        columnKey + " IN ('" + filter.values.join("', '") + "')"
                    );
                    return;
                }

                console.log('unsupported filter type: ' + filter.filterType);
            });
        }

        if (whereParts.length > 0) {
            return ' WHERE ' + whereParts.join(' AND ');
        }

        return '';
    }

    function orderBySql(request) {
        var sortModel = request.sortModel;

        if (sortModel.length === 0) return '';

        var sorts = sortModel.map(function (s) {
            return s.colId + ' ' + s.sort.toUpperCase();
        });

        return ' ORDER BY ' + sorts.join(', ');
    }

    function limitSql(request) {
        if (request.endRow == undefined || request.startRow == undefined) {
            return '';
        }
        var blockSize = request.endRow - request.startRow;

        return ' LIMIT ' + blockSize + ' OFFSET ' + request.startRow;
    }

    function getLastRowIndex(request) {
        return executeQuery({ ...request, startRow: undefined, endRow: undefined })
            .length;
    }
}

</script>
