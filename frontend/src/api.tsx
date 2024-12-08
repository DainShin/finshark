import axios from "axios"
import { CompanyBalanceSheet, CompanyCashFlow, CompanyCompData, CompanyIncomeStatement, CompanyKeyMetrics, CompanyProfile, CompanySearch, CompanyTenK } from "./company";

interface SearchResponse {
    data: CompanySearch[];
}

// search company
export const searchCompanies = async (query:string) => {
    try {
        const data = await axios.get<SearchResponse>(
             `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=OsE7F9kogjo7eU9KKkxxSSCmVS0csNmb`
        );
        return data;
    } catch (error) {
        if(axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error);
            return "An expected error has occured."
        }
    }
}

// get company profile
export const getCompanyProfile = async (query: string) => {
    try {
        const data = await axios.get<CompanyProfile[]> (
            `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=OsE7F9kogjo7eU9KKkxxSSCmVS0csNmb`
        )
        return data;
    }catch (error: any) {
        console.log("Error message from API: ", error.message);
    }
}

export const getKeyMetrics = async (query: string) => {
    try {
        const data = await axios.get<CompanyKeyMetrics[]> (
            `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?limit=40&apikey=OsE7F9kogjo7eU9KKkxxSSCmVS0csNmb`
        )
        return data;
    }catch (error: any) {
        console.log("Error message from API: ", error.message);
    }
}

export const getIncomeStatement = async (query: string) => {
    try {
        const data = await axios.get<CompanyIncomeStatement[]> (
            `https://financialmodelingprep.com/api/v3/income-statement/${query}?limit=40&apikey=OsE7F9kogjo7eU9KKkxxSSCmVS0csNmb`
        )
        return data;
    }catch (error: any) {
        console.log("Error message from API: ", error.message);
    }
}

export const getBalanceSheet = async (query: string) => {
    try {
        const data = await axios.get<CompanyBalanceSheet[]> (
            `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?limit=40&apikey=OsE7F9kogjo7eU9KKkxxSSCmVS0csNmb`
        )
        return data;
    }catch (error: any) {
        console.log("Error message from API: ", error.message);
    }
}

export const getCashFlowStatement = async (query: string) => {
    try {
        const data = await axios.get<CompanyCashFlow[]> (
            `https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?limit=40&apikey=OsE7F9kogjo7eU9KKkxxSSCmVS0csNmb`
        )
        return data;
    }catch (error: any) {
        console.log("Error message from API: ", error.message);
    }
}

// current subscription model cannot use this 
export const getCompData = async (query: string) => {
    try {
        const data = await axios.get<CompanyCompData[]> (
            `https://financialmodelingprep.com/api/v4/stock_peers?symbol=${query}&apikey=OsE7F9kogjo7eU9KKkxxSSCmVS0csNmb`
        )
        return data;
    }catch (error: any) {
        console.log("Error message from API: ", error.message);
    }
}

export const getTenK = async (query: string) => {
    try {
        const data = await axios.get<CompanyTenK[]> (
            `https://financialmodelingprep.com/api/v3/sec_filings/${query}?type=10-k&page=0&apikey=OsE7F9kogjo7eU9KKkxxSSCmVS0csNmb`
        )
        return data;
    }catch (error: any) {
        console.log("Error message from API: ", error.message);
    }
}