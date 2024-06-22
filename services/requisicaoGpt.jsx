
import { useState, useCallback } from "react";

function useApiHook() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const key = ''; // Substitua pela sua chave da API

    const callApi = useCallback(async (prompt) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${key}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            "role": "user",
                            "content": prompt
                        }
                    ],
                    temperature: 0.20,
                    max_tokens: 200,
                    top_p: 1,
                })
            });
            const result = await response.json();
            setData(result);
            console.log(result)
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [key]);

    return { loading, data, error, callApi };
}

export default useApiHook;