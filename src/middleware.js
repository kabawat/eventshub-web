import { NextResponse } from 'next/server';

export async function middleware(request) {
    const accessToken = request.cookies.get('x_a_t');
    
    if (!accessToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: [
        '/', 
        '/create-event', 
        '/events', 
        '/events/:id*',
    ],
};
