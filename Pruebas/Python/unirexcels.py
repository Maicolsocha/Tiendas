import os
import pandas as pd
import tkinter as tk
from tkinter import filedialog, messagebox

def combine_excels(input_folder_path, output_folder_path):
    # Lista para almacenar los dataframes
    dfs = []

    # Recorrer todas las carpetas y archivos en la carpeta principal
    for root, dirs, files in os.walk(input_folder_path):
        for file in files:
            if file.endswith('.xlsx'):
                # Crear la ruta completa del archivo
                file_path = os.path.join(root, file)
                # Leer el archivo Excel, ignorando la primera fila (encabezados)
                df = pd.read_excel(file_path, skiprows=1)
                # Añadir el dataframe a la lista si no está vacío
                if not df.empty:
                    dfs.append(df)

    # Concatenar todos los dataframes no vacíos en uno solo
    if dfs:
        combined_df = pd.concat(dfs, ignore_index=True)
        # Crear la ruta del archivo combinado
        output_file_path = os.path.join(output_folder_path, 'archivo_combinado.xlsx')
        # Guardar el dataframe combinado en un nuevo archivo Excel
        combined_df.to_excel(output_file_path, index=False)
        print(f'Archivo combinado guardado en: {output_file_path}')
        return output_file_path
    else:
        print('No se encontraron archivos Excel válidos para combinar.')
        return None

def browse_input_folder():
    folder_selected = filedialog.askdirectory()
    input_folder_path.set(folder_selected)

def browse_output_folder():
    folder_selected = filedialog.askdirectory()
    output_folder_path.set(folder_selected)

def on_create_button_click():
    input_folder = input_folder_path.get()
    output_folder = output_folder_path.get()
    if not input_folder or not output_folder:
        messagebox.showerror("Error", "Por favor, selecciona las rutas de entrada y salida.")
        return
    result = combine_excels(input_folder, output_folder)
    if result:
        messagebox.showinfo("Éxito", f'Archivo combinado guardado en: {result}')
    else:
        messagebox.showwarning("Advertencia", "No se encontraron archivos Excel válidos para combinar.")

# Crear la ventana principal
root = tk.Tk()
root.title("Combinar Archivos Excel")

# Variables para las rutas
input_folder_path = tk.StringVar()
output_folder_path = tk.StringVar()

# Crear y ubicar los elementos en la ventana
tk.Label(root, text="Ruta de la carpeta principal:").grid(row=0, column=0, padx=10, pady=5, sticky='e')
tk.Entry(root, textvariable=input_folder_path, width=50).grid(row=0, column=1, padx=10, pady=5)
tk.Button(root, text="Seleccionar carpeta", command=browse_input_folder).grid(row=0, column=2, padx=10, pady=5)

tk.Label(root, text="Ruta de la carpeta de salida:").grid(row=1, column=0, padx=10, pady=5, sticky='e')
tk.Entry(root, textvariable=output_folder_path, width=50).grid(row=1, column=1, padx=10, pady=5)
tk.Button(root, text="Seleccionar carpeta", command=browse_output_folder).grid(row=1, column=2, padx=10, pady=5)

tk.Button(root, text="Crear", command=on_create_button_click).grid(row=2, column=1, padx=10, pady=20)

# Ejecutar el bucle principal de la ventana
root.mainloop()
