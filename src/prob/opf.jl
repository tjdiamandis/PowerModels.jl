export run_opf, run_ac_opf, run_dc_opf

""
function run_ac_opf(file, solver; kwargs...)
    return run_opf(file, ACPPowerModel, solver; kwargs...)
end

""
function run_dc_opf(file, solver; kwargs...)
    return run_opf(file, DCPPowerModel, solver; kwargs...)
end


""
function run_opf(file, model_constructor, solver; kwargs...)
    return run_generic_model(file, model_constructor, solver, post_opf; kwargs...)
end

""
function post_opf(pm::GenericPowerModel)
    variable_voltage(pm)
    variable_generation(pm)
    variable_branch_flow(pm)
    variable_dcline_flow(pm)

    objective_min_fuel_cost(pm)

    constraint_voltage(pm)

    for i in ids(pm, :ref_buses)
        constraint_theta_ref(pm, i)
    end

    for i in ids(pm, :bus)
        constraint_kcl_shunt(pm, i)
    end

    for i in ids(pm, :branch)
        constraint_ohms_yt_from(pm, i)
        constraint_ohms_yt_to(pm, i)

        constraint_voltage_angle_difference(pm, i)

        constraint_thermal_limit_from(pm, i)
        constraint_thermal_limit_to(pm, i)
    end

    for i in ids(pm, :dcline)
        constraint_dcline(pm, i)
    end
end


""
function run_opf_tp(file, model_constructor, solver; kwargs...)
    return run_generic_model(file, model_constructor, solver, post_opf_tp; kwargs...)
end

"opf with transformer parameters in polar form"
function post_opf_tp(pm::GenericPowerModel)
    variable_voltage(pm)
    variable_generation(pm)
    variable_branch_flow(pm)
    variable_dcline_flow(pm)

    objective_min_fuel_cost(pm)

    constraint_voltage(pm)

    for i in ids(pm, :ref_buses)
        constraint_theta_ref(pm, i)
    end

    for i in ids(pm, :bus)
        constraint_kcl_shunt(pm, i)
    end

    for i in ids(pm, :branch)
        constraint_ohms_y_from(pm, i)
        constraint_ohms_y_to(pm, i)

        constraint_voltage_angle_difference(pm, i)

        constraint_thermal_limit_from(pm, i)
        constraint_thermal_limit_to(pm, i)
    end

    for i in ids(pm, :dcline)
        constraint_dcline(pm, i)
    end
end


"opf with implicit branch flow variables"
function run_opf_ibf(file, model_constructor, solver; kwargs...)
    return run_generic_model(file, model_constructor, solver, post_opf_ibf; kwargs...)
end

""
function post_opf_ibf(pm::GenericPowerModel)
    variable_voltage(pm)
    variable_generation(pm)
    variable_dcline_flow(pm)

    expression_branch_flow_yt(pm)

    objective_min_fuel_cost(pm)

    constraint_voltage(pm)

    for i in ids(pm, :ref_buses)
        constraint_theta_ref(pm, i)
    end

    for i in ids(pm, :bus)
        constraint_kcl_shunt(pm, i)
    end

    for i in ids(pm, :branch)
        constraint_voltage_angle_difference(pm, i)

        constraint_thermal_limit_from(pm, i)
        constraint_thermal_limit_to(pm, i)
    end

    for i in ids(pm, :dcline)
        constraint_dcline(pm, i)
    end
end


"opf with implicit branch flow variables and transformer parameters in polar form"
function run_opf_ibf_tp(file, model_constructor, solver; kwargs...)
    return run_generic_model(file, model_constructor, solver, post_opf_ibf_tp; kwargs...)
end

""
function post_opf_ibf_tp(pm::GenericPowerModel)
    variable_voltage(pm)
    variable_generation(pm)
    variable_dcline_flow(pm)

    expression_branch_flow_y(pm)

    objective_min_fuel_cost(pm)

    constraint_voltage(pm)

    for i in ids(pm, :ref_buses)
        constraint_theta_ref(pm, i)
    end

    for i in ids(pm, :bus)
        constraint_kcl_shunt(pm, i)
    end

    for i in ids(pm, :branch)
        constraint_voltage_angle_difference(pm, i)

        constraint_thermal_limit_from(pm, i)
        constraint_thermal_limit_to(pm, i)
    end

    for i in ids(pm, :dcline)
        constraint_dcline(pm, i)
    end
end

