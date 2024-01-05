import { NextResponse } from 'next/server';

export const runtime = "edge";

export async function POST(request: Request) {
    // Parse the request body
    const req = await request.json();

    try {
        // Your OpenAI API key
        const apiKey = process.env.OPENAI_API_KEY;

        // Your OpenAI API endpoint
        const apiUrl = 'https://api.openai.com/v1/chat/completions';

        // Structure input as a series of messages
        const messages = [
            { role: 'system', content: "You are a helpful assistant that answers Islamic questions." },
            {
                role: 'user', content: `Where Target Users is Muslims: Give me json object called islamicData 
                that contain an object for an introduction about ${req.name} called intro and have two parameters 
                title and content and islamicData also contain an json array for ${req.description} 
                most important 4 key points called keyPoints and each object in keyPoints have two parameters 
                point as string and description and islamicData also contain an json array for 6 FAQ about ${req.description} called 
                faqs and each object in faqs have two parameters question and answer. 
                just give me json object without any explains mean format="json"`
            },
            // { role: 'user', content: `Field 1: Give me a short introduction about ${req.name}.` },
            // { role: 'user', content: `Field 2: Give me 4 Key points about ${req.description}.` },
            // { role: 'user', content: `Field 3: Give me 6 FAQ about ${req.description}.` },
        ];

        // Make a request to OpenAI API using the Chat-based input endpoint
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messages,
            }),
        });

        // Handle the response as needed (await response to parse it to json format)
        const data: any = await response.json();

        return NextResponse.json({
            message: '',
            data: data?.choices[0]?.message?.content
        }, { status: 200 });
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
        }, { status: 500 });
    }
}