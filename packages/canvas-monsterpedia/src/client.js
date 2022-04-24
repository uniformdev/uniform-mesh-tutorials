const DEFAULT_BASE_MONSTER_URL = "https://www.dnd5eapi.co";

function getMonstersUrl(baseUrl, filter) {
    const url = new URL("/api/monsters", baseUrl ? baseUrl : DEFAULT_BASE_MONSTER_URL);
    if (filter) {
        url.searchParams.append("name", filter);
    }
    return url;
}
function getMonsterUrl(index, baseUrl) {
    return new URL(`/api/monsters/${index}`, baseUrl ? baseUrl : DEFAULT_BASE_MONSTER_URL);
}

/**
 * 
 * @param {string} baseUrl 
 * @returns 
 */
export function createClient(baseUrl) {
    return {
        getMonster: async function(index) {
            const url = getMonsterUrl(index, baseUrl);
            const response = await fetch(url);
            if (response.ok) {
                return response.json();
            }
            const { status, statusText } = response;
            return {
                status, statusText
            }
        },
        getMonsters: async function (filter) {
            const url = getMonstersUrl(baseUrl, filter);
            const response = await fetch(url);
            if (response.ok) {
                return response.json();
            }
            const { status, statusText } = response;
            return {
                status, statusText
            }
        },
        getUrl: function() {
            if (!baseUrl || baseUrl == "") return DEFAULT_BASE_MONSTER_URL;
            return baseUrl;
        }
    }
}

