from typing import Callable, Awaitable
from starlette.requests import Request
from starlette.responses import Response
from starlette.middleware.base import BaseHTTPMiddleware

RequestResponseEndpoint = Callable[[Request], Awaitable[Response]]

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        token = request.cookies.get("access_token")
        if token:
            # Create a new scope with the modified headers
            scope = request.scope
            scope['headers'] = [(name, value) for name, value in scope['headers'] if name != b'authorization']
            scope['headers'].append((b'authorization', f"Bearer {token}".encode('latin-1')))

            request = Request(scope, receive=request._receive)

        response = await call_next(request)
        return response