import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { LicenseManager } from 'ag-grid-enterprise'
LicenseManager.setLicenseKey(
    'Using_this_{AG_Grid}_Enterprise_key_{AG-056203}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{L3Harris_Technologies,_Inc.}_is_granted_a_{Multiple_Applications}_Developer_License_for_{13}_Front-End_JavaScript_developers___All_Front-End_JavaScript_developers_need_to_be_licensed_in_addition_to_the_ones_working_with_{AG_Grid}_Enterprise___This_key_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{20_April_2025}____[v3]_[01]_MTc0NTEwMzYwMDAwMA==1d2cebabce0ce5a38371a75815efe866'
)

createApp(App).mount('#app')
