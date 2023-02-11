export const xiCodes = {
    code_index: 0x20,

    // launcher request codes
    launcher_login: 0x10,
    launcher_create: 0x20,
    launcher_change_password: 0x30,

    // server response codes
    account_login_success: 0x001,
    account_login_error: 0x002,
    account_create_success: 0x003,
    account_create_taken: 0x004,
    account_create_disabled: 0x008,
    account_create_error: 0x009,
    account_pass_change_request: 0x005,
    account_pass_change_success: 0x006,
    account_pass_change_error: 0x007,

    // languages
    language_japanese: 0,
    language_english: 1,
    language_european: 2,

    // definitions
    CLSID_FFXiEntry: "{989d790d-6236-11d4-80e9-0010-5a81-e890}",
    IID_IFFXiEntry: "{989D790C-6236-11D4-80E9-00105A81E890}",

    CLSID_POLCoreCom: [
        "{07974581-0df6-4ef0-bd05-6049-3ada-9be9}", // JP
        "{3501f5dd-7894-42df-866a-a2b6-527d-8049}", // US
        "{e5966fb3-c97b-42eb-84bf-37f9-5ee5-4a9f}"  // EU
    ],

    IID_IPOLCoreCom: [
        "{9a30d565-a74c-4b56-b971-dcf0-2185-b10d}", // JP
        "{e0516654-ef77-435d-aa7d-50d2-c069-ce34}", // US
        "{dfec2e93-4971-4a54-b8ed-6381-5c20-8c5a}"  // EU
    ],

    // function offset definitions
    POLFUNC_INET_MUTEX: 0x032F,
    POLFUNC_REGISTRY_LANG: 0x03C5,
    POLFUNC_FFXI_LANG: 0x01A4,
    POLFUNC_REGISTRY_KEY: 0x016F,
    POLFUNC_INSTALL_FOLDER: 0x007D
};