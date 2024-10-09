from terminals import get_terminal_by_name
import asyncio


def calculate_broadcast(ip: str, mask: str):
    """Calcular la dirección de broadcast, necesaria para el descubrimiento de red."""
    ip_bytes = ip_to_bytes(ip)
    mask_bytes = ip_to_bytes(mask)
    broadcast_bytes = [(ip_bytes[i] | ~mask_bytes[i] & 0xFF) for i in range(4)]
    return bytes_to_ip(broadcast_bytes)


def ip_to_bytes(ip_string: str):
    """Convertir una dirección IP en formato string a una lista de bytes."""
    return [int(octet) for octet in ip_string.split(".")]


def bytes_to_ip(ip_bytes: list[int]):
    """Convertir una lista de bytes a formato string IP."""
    return ".".join(str(b) for b in ip_bytes)


async def discover_terminals(pool, broadcast_ip: str, broadcast_port: int):
    """Enviar periódicamente un mensaje de broadcast para descubrir a los controladores terminales."""
    print("Descubriendo terminales...")
    # Crear un socket UDP
    udp = pool.socket(pool.AF_INET, pool.SOCK_DGRAM)
    # No bloquear la ejecución si no hay mensajes
    udp.setblocking(False)

    time_interval_seconds = 3  # Tiempo entre broadcast y broadcast

    while True:
        try:
            udp.sendto(b"DISCOVER", (broadcast_ip, broadcast_port))

            # Intentar leer bytes del socket UDP
            buffer = bytearray(512)
            length, addr = udp.recvfrom_into(buffer)
            response = buffer[:length]

            if response.startswith(b"TERMINAL"):
                _, terminal_name, port = response.decode().split(";")
                terminal = get_terminal_by_name(terminal_name)

                if terminal is None:
                    print(f"Error: nombre de terminal {terminal} no conocido")
                    continue

                if terminal.is_connected():
                    # Terminal ya conectada
                    continue

                print(f"Encontrado a {terminal_name} en {addr[0]}:{port}")
                # TODO: conectar concurrentemente los varios terminales descubiertos.
                await terminal.connect_to_terminal(pool, addr[0], int(port))
        except OSError:
            # Ceder el control si no hay mensajes
            await asyncio.sleep(time_interval_seconds)
